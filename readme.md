# Meme Coin Tracker

## Introduction
Meme Coin Tracker is a project designed to scrape and save tweets from specific influencers related to meme coins. The project consists of two main parts: a scraper that saves unique tweets to a central database and a socket server that serves this data in real-time with a minimal UI. This tool can be extended to other social media platforms and used for various purposes, such as sentiment analysis or staying updated with the latest trends.

## Demo
Here are some assets demonstrating the Meme Coin Tracker in action:

### Video
![Watch Demo Video](assets/meme_coin_tracker_demo1.mp4)

### Screenshot
![Demo Screenshot](assets/memecoin1.png)
![Demo Screenshot](assets/memecoin2.png)
![Demo Screenshot](assets/memecoin3.png)
![Demo Screenshot](assets/memecoin4.png)

## Problem Statement
Tracking tweets from influencers manually can be time-consuming and inefficient. There is a need for an automated system that can scrape tweets, save them to a database, and serve the data in real-time. This system should also be able to handle media in posts and provide a user-friendly interface.

## Use Cases
1. **Sentiment Analysis**: By tracking tweets from influencers related to meme coins, users can perform sentiment analysis to gauge market trends and make informed decisions.
2. **Staying Updated**: Users can follow the latest tech trends or updates from their favorite influencers without manually visiting their pages.
3. **Content Creation**: Fans of specific topics, such as Blackpink, can stay updated with all related pages and create current, ongoing content.
4. **Market Research**: Businesses can use the tool to monitor influencer opinions and trends related to their products or industry, helping them make data-driven decisions.
5. **Event Monitoring**: Users can track tweets related to specific events, such as conferences or product launches, to stay informed about real-time developments.
6. **Competitor Analysis**: Companies can keep an eye on their competitors by tracking tweets from influencers who discuss competing products or services.
7. **Job Postings Scraper**: Apply a similar model to scrape job postings from established companies, ensuring uniqueness and preventing issues like expired links or fraudulent internships. This can help job seekers avoid multiple redirections and expired or fraudulent job postings, which are increasingly common on platforms like LinkedIn.

## Components
### 1. Scraper
The scraper is responsible for:
- Scraping tweets from specific influencers.
- Saving unique tweets to a central database.
- Ensuring that only relevant tweets related to meme coins are saved.

### 2. Socket Server
The socket server is responsible for:
- Serving the scraped data in real-time.
- Providing a minimal UI to display the data.
- Handling media in posts.
- Extending support to other social media platforms.

## Challenges Overcome
During the development of the Meme Coin Tracker, one of the challenges faced was dealing with the output of `console.log` when logging nested objects. Normally, using `console.log` to print nested objects resulted in `[ [Object] ]`, which made it unclear what the actual content was. To overcome this, `JSON.stringify` was used to convert the object into a readable string format. This approach provided a clear view of the data structure and content, making debugging and development more efficient.

Example:
```javascript
// Before
console.log(complex_nested_objects); // Output: [ [Object] ]

// After
console.log(JSON.stringify(complex_nested_objects, null, 2)); // Output: [ { "url": "http://example.com" }, { "url": "http://example2.com" } ]
```

## Current Issues
Currently, there is an issue where the socket disconnects every time a duplicated tweet is encountered or when the main function waits for 2 seconds before another scrape. This issue needs to be addressed to ensure continuous real-time data streaming without interruptions.

## Installation
To install and run the Meme Coin Tracker, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/amul69906995/meme-coin-tracker.git
    ```

2. Navigate to the project directory:
    ```bash
    cd meme-coin-tracker
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up the environment variables by copying `.env.example` to `.env` and configuring the necessary values:
    ```bash
    cp .env.example .env
    ```

5. Run the backend server:
    ```bash
    node app.js
    ```

6. Open `index.html` in your browser to view the frontend. The styling part is done by GPT.


## Contributing
// ...existing code...

## License
// ...existing code...
