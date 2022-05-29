import classes from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Shop from "./Shop";
import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
function MainPage() {
  const showname = useSelector((state) => state.name.name);
  const [items, setItems] = useState(
    showname || JSON.parse(localStorage.getItem("item")) || []
  );
  const [filter, setFilter] = useState([...items]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("item")) || []);
  }, []);
  const listAfterDeletion = (idx) => {
    const oldList = JSON.parse(localStorage.getItem("item")) || [];
    let updatedList = [];
    let newFilter = [];
    let oldFilter = filter;
    for (let i = 0; i < oldList.length; i++) {
      const temp = oldList[i];
      if (temp.name !== idx) {
        updatedList.push(temp);
      }
    }
    for (let i = 0; i < oldFilter.length; i++) {
      const temp = oldFilter[i];
      if (temp.name !== idx) {
        newFilter.push(temp);
      }
    }
    localStorage.setItem("item", JSON.stringify(updatedList));
    setItems(updatedList);
    setFilter(newFilter);
  };
  const navigate = useNavigate();
  function openForm(e) {
    navigate(`/form`);
  }
  let arr = [];
  let i;

  function getList(e) {
    if (e.target.value === "fill") {
      i = items;
    } else {
      i = items.filter(
        (n) => n.location === e.target.value || n.category === e.target.value
      );
    }
    // if (e.target.value.substring(0, 1) === "a") {
    //   setFilterarea(e.target.value.substring(1));
    // } else {
    //   setFiltercategory(e.target.value);
    // }
    if (i.length > 1) {
      arr.push(i);
      setFilter(...arr, i);
    } else setFilter(i);
  }

  return (
    <React.Fragment>
      <div className={classes.background}>
        <div className={classes.layer}>
          <div className={classes.tag}>
            We’ve got everything you like, what’s not to love?
          </div>
          <i>
            Why not give us a try? <br />
            If you don’t like us, we can take our business elsewhere.
          </i>
          <br />
          <button className={classes.add} onClick={openForm}>
            Add shop
          </button>
        </div>
      </div>
      <div className={classes.right}>
        <select className={classes.filter} onClick={getList}>
          <option value="fill">filter by area</option>
          <option value="Thane">Thane</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Nashik">Nashik</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Ahmednagar">Ahmednagar</option>
          <option value="Solapur">Solapur</option>
        </select>
        <select className={classes.filter} onClick={getList}>
          <option value="fill">filter by category</option>
          <option value="Grocery">Grocery</option>
          <option value="Butcher">Butcher</option>
          <option value="Baker">Baker</option>
          <option value="Chemist">Chemist</option>
          <option value="Stationary">Stationary</option>
        </select>
      </div>
      <div className={classes.list}>
        {filter.length > 0 ? (
          filter.map((n) => (
            <Shop
              listAfterDeletion={listAfterDeletion}
              details={n}
              key={uuid()}
            />
          ))
        ) : (
          <div className={classes.notice}>No shops in the list!!!</div>
        )}
      </div>
    </React.Fragment>
  );
}
export default MainPage;
