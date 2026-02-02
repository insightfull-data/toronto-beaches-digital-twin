import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Synthetic resident data generator
const generateSyntheticResidents = () => {
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'James',
        'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Mia', 'Henry', 'Harper', 'Alexander', 'Evelyn', 'Sebastian',
        'Priya', 'Arjun', 'Yuki', 'Wei', 'Fatima', 'Ahmed', 'Maria', 'Diego', 'Ling', 'Raj'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Chen', 'Patel', 'Lee', 'Kumar', 'Nguyen', 'Kim', 'Singh', 'Ali', 'Wang', 'Zhang'];
    const streets = ['Queen St E', 'Kingston Rd', 'Beech Ave', 'Lee Ave', 'Woodbine Ave', 'Glen Manor Dr', 
        'Kenilworth Ave', 'Waverley Rd', 'Maclean Ave', 'Leuty Ave', 'Kippendavie Ave'];
    const occupations = ['Teacher', 'Software Developer', 'Nurse', 'Artist', 'Small Business Owner', 'Consultant',
        'Marketing Manager', 'Architect', 'Writer', 'Engineer', 'Therapist', 'Designer', 'Accountant', 'Chef'];
    const interests = ['Cycling', 'Beach volleyball', 'Yoga', 'Running', 'Gardening', 'Photography', 'Reading',
        'Cooking', 'Swimming', 'Hiking', 'Music', 'Art', 'Board games', 'Community volunteering'];

    const residents = [];
    const fsas = ['M4E', 'M4L'];
    
    for (let i = 0; i < 250; i++) {
        const age = Math.floor(Math.random() * 60) + 25;
        const hasChildren = Math.random() > 0.6;
        const numChildren = hasChildren ? Math.floor(Math.random() * 3) + 1 : 0;
        
        residents.push({
            id: i + 1,
            firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
            age: age,
            address: `${Math.floor(Math.random() * 500) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`,
            fsa: fsas[Math.floor(Math.random() * fsas.length)],
            occupation: occupations[Math.floor(Math.random() * occupations.length)],
            householdSize: 1 + numChildren + (Math.random() > 0.5 ? 1 : 0),
            children: numChildren,
            interests: Array.from({length: Math.floor(Math.random() * 3) + 2}, 
                () => interests[Math.floor(Math.random() * interests.length)]),
            yearsInNeighborhood: Math.floor(Math.random() * 25) + 1,
            homeOwner: Math.random() > 0.35
        });
    }
    
    return residents;
};

function App() {
    const [residents] = useState(generateSyntheticResidents());
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('Ask me anything about Toronto Beaches residents...');
    const [loading, setLoading] = useState(false);

    const stats = {
        totalResidents: residents.length,
        avgAge: Math.round(residents.reduce((sum, r) => sum + r.age, 0) / residents.length),
        homeOwners: Math.round((residents.filter(r => r.homeOwner).length / residents.length) * 100),
        avgHouseholdSize: (residents.reduce((sum, r) => sum + r.householdSize, 0) / residents.length).toFixed(1)
    };

    const ageGroups = [
        { name: '25-34', count: residents.filter(r => r.age >= 25 && r.age < 35).length },
        { name: '35-44', count: residents.filter(r => r.age >= 35 && r.age < 45).length },
        { name: '45-54', count: residents.filter(r => r.age >= 45 && r.age < 55).length },
        { name: '55-64', count: residents.filter(r => r.age >= 55 && r.age < 65).length },
        { name: '65+', count: residents.filter(r => r.age >= 65).length }
    ];

    const handleQuery = async () => {
        if (!query.trim()) return;
        
        setLoading(true);
        setResponse('Analyzing data...');
        
        try {
            const residentData = JSON.stringify(residents, null, 2);
            
            const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    messages: [{
                        role: 'user',
                        content: `You are analyzing synthetic demographic data for Toronto Beaches residents (FSAs M4E and M4L).

Here is the complete resident dataset:
${residentData}

User question: ${query}

Provide a clear, concise answer based on the data. Include specific numbers and insights. Format your response in a natural, conversational way.`
                    }]
                })
            });
            
            const data = await apiResponse.json();
            const answer = data.content.map(item => item.type === 'text' ? item.text : '').join('\n');
            setResponse(answer || 'Unable to generate response.');
        } catch (error) {
            setResponse(`Error: ${error.message}\n\nNote: To enable AI-powered queries, add your Anthropic API key as REACT_APP_ANTHROPIC_API_KEY in Replit Secrets. The synthetic data is available for manual exploration below.`);
        }
        
        setLoading(false);
    };

    const exampleQueries = [
        "What's the average age of residents?",
        "How many people have children?",
        "What are the most common occupations?",
        "Which neighborhood (M4E vs M4L) has more homeowners?",
        "What percentage of residents are interested in cycling?"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-blue-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="font-spectral text-7xl font-bold text-slate-800 mb-3 tracking-tight">
                        Beaches Digital Twin
                    </h1>
                    <div className="font-public text-sm tracking-widest text-slate-500 uppercase mb-2">
                        Synthetic Population Data
                    </div>
                    <div className="font-spectral text-2xl text-blue-600 italic">
                        Toronto East End • FSA M4E & M4L
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Residents', value: stats.totalResidents },
                        { label: 'Average Age', value: stats.avgAge },
                        { label: 'Home Ownership', value: `${stats.homeOwners}%` },
                        { label: 'Avg Household Size', value: stats.avgHouseholdSize }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white/90 backdrop-blur-sm p-8 rounded-sm border-l-4 border-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="font-public text-xs tracking-widest text-slate-500 uppercase mb-2">
                                {stat.label}
                            </div>
                            <div className="font-spectral text-5xl font-bold text-slate-800">
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Demographics Chart */}
                    <div className="bg-white/95 backdrop-blur-sm p-10 rounded-sm shadow-lg">
                        <h2 className="font-spectral text-3xl font-semibold text-slate-800 mb-6 pb-4 border-b-2 border-amber-200">
                            Demographics
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ageGroups}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#475569" />
                                <YAxis stroke="#475569" />
                                <Tooltip 
                                    contentStyle={{ background: '#f8fafc', border: '2px solid #1e40af' }}
                                />
                                <Bar dataKey="count" fill="#1e40af" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Sample Residents */}
                    <div className="bg-white/95 backdrop-blur-sm p-10 rounded-sm shadow-lg">
                        <h2 className="font-spectral text-3xl font-semibold text-slate-800 mb-6 pb-4 border-b-2 border-amber-200">
                            Sample Residents
                        </h2>
                        <div className="max-h-96 overflow-y-auto space-y-4">
                            {residents.slice(0, 6).map(resident => (
                                <div key={resident.id} className="bg-sky-50 p-5 rounded-sm border-l-3 border-emerald-600 hover:bg-white hover:border-orange-500 hover:translate-x-1 transition-all duration-200">
                                    <div className="font-spectral text-xl font-semibold text-slate-800 mb-2">
                                        {resident.firstName} {resident.lastName}
                                    </div>
                                    <div className="font-public text-sm text-slate-600 leading-relaxed">
                                        Age {resident.age} • {resident.occupation}<br/>
                                        {resident.address} ({resident.fsa})<br/>
                                        {resident.householdSize} person household • 
                                        {resident.homeOwner ? ' Homeowner' : ' Renter'}<br/>
                                        Interests: {resident.interests.join(', ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Query Section */}
                <div className="bg-white/95 backdrop-blur-sm p-10 rounded-sm shadow-lg">
                    <h2 className="font-spectral text-3xl font-semibold text-slate-800 mb-6 pb-4 border-b-2 border-amber-200">
                        Ask Questions About the Data
                    </h2>
                    
                    {/* Example Queries */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {exampleQueries.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => setQuery(q)}
                                className="px-5 py-2 bg-white border-2 border-amber-200 rounded-full text-sm font-public text-slate-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-200"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* Query Input */}
                    <div className="flex gap-4 mb-8">
                        <input
                            type="text"
                            className="flex-1 px-6 py-4 text-lg font-public border-2 border-amber-200 rounded-sm bg-sky-50 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                            placeholder="Ask about demographics, interests, housing, occupations..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                        />
                        <button
                            onClick={handleQuery}
                            disabled={loading}
                            className="px-10 py-4 text-lg font-semibold font-public bg-blue-700 text-white rounded-sm hover:bg-slate-800 hover:-translate-y-1 disabled:bg-amber-200 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider"
                        >
                            {loading ? 'Analyzing...' : 'Query'}
                        </button>
                    </div>

                    {/* Response */}
                    <div className="bg-sky-50 p-8 rounded-sm border-l-4 border-blue-500 min-h-40 font-public text-lg leading-relaxed whitespace-pre-wrap">
                        {loading ? <span className="animate-pulse">{response}</span> : response}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
