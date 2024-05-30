// import { TwitterAPIkey } from "../config";
import { useEffect } from "react";

export default function TwitterFeedUpdates() {
  //  Loading the Twitter Widgets library asynchronously
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      className="twitter-container m-4"
      style={{ maxHeight: "600px", overflowY: "auto" }}
    >
      <a className="twitter-timeline m-4" href="https://twitter.com/askrapidkl">
        Tweets by askrapidkl
      </a>
    </div>
  );
}
