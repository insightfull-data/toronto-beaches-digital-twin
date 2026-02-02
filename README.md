# Toronto Beaches Digital Twin

A synthetic population data application for Toronto Beaches residents (FSAs M4E & M4L) with AI-powered conversational queries.

## Features

- **250 Synthetic Residents** - Realistic demographic data including ages, occupations, addresses, household information, and interests
- **Interactive Visualizations** - Age distribution charts and key statistics dashboard
- **AI-Powered Queries** - Ask natural language questions about the data using Claude
- **Sample Profiles** - Browse detailed resident profiles from both M4E and M4L neighborhoods

## Setup in Replit

### 1. Create a New Repl
- Go to [Replit](https://replit.com)
- Click "Create Repl"
- Select "React JavaScript" as the template
- Name it "toronto-beaches-digital-twin"

### 2. Copy Files
Copy all files from this directory to your Repl:
- `package.json` - Dependencies
- `public/index.html` - HTML template
- `src/index.js` - Entry point
- `src/index.css` - Styles
- `src/App.js` - Main component
- `tailwind.config.js` - Tailwind configuration

### 3. Install Tailwind CSS
In the Replit Shell, run:
```bash
npm install -D tailwindcss postcss autoprefixer
```

### 4. Configure API Key (Optional)
To enable AI-powered queries:

1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. In Replit, go to "Secrets" (lock icon in left sidebar)
3. Add a new secret:
   - Key: `REACT_APP_ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key

**Note:** The app works without an API key - you can still explore the synthetic data and visualizations. The AI query feature requires the API key.

### 5. Run the App
Click the "Run" button in Replit. The app will:
- Install dependencies automatically
- Start the development server
- Open in the browser window

## How to Use

### Explore the Data
- View key statistics in the dashboard cards
- Check the age distribution chart
- Browse sample resident profiles

### Ask Questions
With API key configured, you can ask questions like:
- "What's the average age of residents?"
- "How many people have children?"
- "What are the most common occupations?"
- "Which neighborhood has more homeowners?"
- "What percentage of residents are interested in cycling?"

Click the example queries or type your own!

## Project Structure

```
toronto-beaches-digital-twin/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # React entry point
│   └── index.css       # Styles with Tailwind
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
└── README.md          # This file
```

## Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Claude API** - AI-powered query responses

## Data Model

Each synthetic resident includes:
- Personal info (name, age)
- Location (address, FSA)
- Household (size, children)
- Professional (occupation)
- Personal (interests, years in neighborhood)
- Housing status (owner/renter)

## Customization

### Modify Data Generation
Edit the `generateSyntheticResidents()` function in `App.js` to:
- Change resident count
- Add new attributes
- Adjust demographic distributions
- Add different FSAs

### Update Styling
- Edit `tailwind.config.js` for theme colors
- Modify `index.css` for global styles
- Update component classes in `App.js`

### Add Features
- Export data to CSV
- Filter by neighborhood
- Add more visualizations
- Create resident search

## License

MIT License - Feel free to use and modify for your projects!

## Credits

Created for Toronto Parks & Recreation data governance initiatives.
