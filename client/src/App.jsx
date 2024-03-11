import "./App.css";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const searchFromServer = async () => {
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${searchText}`
    );
    setData(response.data.data || []);
    console.log(response);
  };

  useEffect(() => {
    searchFromServer(searchText);
  }, [searchText]);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, 100) + "...";
    } else {
      return text;
    }
  }

  return (
    <div className="App">
      <h1>เที่ยวไหนดี</h1>
      <h3>ค้นหาที่เที่ยว</h3>

      <div className="searchTravelBox">
        <input
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      {data.map((item, index) => {
        return (
          <div className="box" key={index}>
            <div className="pic-box">
              <img className="pic" src={item.photos[0]} />
            </div>
            <div className="detail">
              <span className="title">{item.title}</span>
              <span className="description">
                {truncateText(item.description, 100)}
              </span>
              <a href={item.url}>อ่านต่อ</a>
              <span className="tag-box">
                หมวด{" "}
                {item.tags.map((itemTag) => {
                  return <span className="tag">{itemTag}</span>;
                })}
              </span>
              <div>
                <img className="otherPics" src={item.photos[1]} />
                <img className="otherPics" src={item.photos[2]} />
                <img className="otherPics" src={item.photos[3]} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
