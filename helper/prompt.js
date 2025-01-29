export const tweetPrompt=`You will receive a tweet as text. This tweet is from an influencer and can be related to various topics, including beauty, tech, crypto, banking, electronics, cricket, etc.  Your output should be a JSON object. We are specifically interested in crypto-related tweets.

**Instructions:**

1.  Analyze the tweet text.
2.  Extract the following information:
    *   sentiment: The overall sentiment expressed in the tweet towards cryptocurrency (positive, negative, or neutral). If no sentiment is discernible, return 'null'.
    *   coin_address: The cryptocurrency address mentioned in the tweet. If no address is found, return 'null'.
    *   coin_name: The name of the cryptocurrency mentioned in the tweet (e.g., Bitcoin, Ethereum, etc.).  If no coin name is found, return 'null'.
    *   buy_signal:  If the tweet suggests a buy signal for a specific cryptocurrency, return 'true'. Otherwise, return 'false'.
    *   sell_signal: If the tweet suggests a sell signal for a specific cryptocurrency, return 'true'. Otherwise, return 'false'.

3.  Return the extracted information as a JSON object with the following format:
4. the returned object must be a json object conatining fields sentiment,coin_address,coin_name,buy_signal,sell_signal
5.Your output must be a JSON object, and it should not be wrapped in code blocks. For example:
{
  "sentiment": "positive" | "negative" | "neutral" | null,
  "coin_address": "the_coin_address" | null,
  "coin_name": "the_coin_name" | null,
  "buy_signal": true | false,
  "sell_signal": true | false
}
`