/** @format */
import "./App.css";
import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const App = () => {
  // fetching data
  const [users, setusers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setusers(response.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // filter users

  const [filtered, setfiltered] = useState([]);
  const [search, setsearch] = useState("");

  const searchRef = useRef();

  useEffect(() => {
    setfiltered(
      users.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="app">
      <div className="serach">
        <div className="searchbox">
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setsearch(e.target.value)}
            ref={searchRef}
          />
          <FiSearch />
        </div>
        {search.length > 0 && (
          <div className="dropdown">
            {filtered.length > 0 ? (
              filtered.map((item, index) => {
                return (
                  <div
                    className="card"
                    key={index}
                    onClick={(e) => {
                      searchRef.current.value = item.name;
                      setsearch("");
                    }}>
                    <p>{item.name}</p>
                  </div>
                );
              })
            ) : (
              <p>no match</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
