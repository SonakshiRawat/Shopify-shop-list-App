import { useState } from "react";
import classes from "./Form.module.css";
import { useDispatch } from "react-redux";
import { actions } from "../store/index";
import { useNavigate } from "react-router-dom";

function Form() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [openingdate, setOpeningdate] = useState("");
  const [closingdate, setclosingingdate] = useState("");
  const [error, setError] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let arr2 = [];
  const onSubmit = (e) => {
    e.preventDefault();

    let items = JSON.parse(localStorage.getItem("item")) || [];
    const lastId = JSON.parse(localStorage.getItem("lastId")) || 0;
    let newId;
    if (lastId === 0) {
      localStorage.setItem("lastId", 1);
      newId = 1;
    } else {
      localStorage.setItem("lastId", lastId + 1);
      newId = lastId + 1;
    }
    setError("");
    setErrorDate("");

    var letters = /^[A-Za-z]+$/;
    if (!name.match(letters)) {
      setError("*This field should contain only alphabets");
    } else {
      var date1 = new Date(openingdate);
      var date2 = new Date(closingdate);
      if (date2.getTime() - date1.getTime() < 0) {
        setErrorDate("*should be after opening Date");
      } else {
        arr2 = [
          ...items,
          {
            name: name,
            url: url,
            location: location,
            category: category,
            openingdate: openingdate,
            closingdate: closingdate,
          },
        ];
        localStorage.setItem("item", JSON.stringify(arr2));
        items = JSON.parse(localStorage.getItem("item")) || [];
        dispatch(
          actions({
            type: "name",
            val: { items },
          })
        );

        navigate(`/`);
      }
    }
  };

  return (
    <div className={classes.background}>
      <div className={classes.layer}>
        <div className={classes.modal}>
          <img
            src="images/3.jpg"
            alt="unavailable"
            className={classes.form_img}
          />
          <form className={classes.modal_content} onSubmit={onSubmit}>
            <div className={classes.container1}>
              <label>
                <b>Shop Name</b>

                <input
                  type="text"
                  className={classes.nameLogin}
                  placeholder="Enter name"
                  name="uname"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <div className={classes.error}>{error}</div>
              </label>
              <br />
              <label>
                <b>Shop Image</b>
                <input
                  type="text"
                  className={classes.nameLogin}
                  placeholder="Enter url"
                  name="uname"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  required
                />
              </label>
              <br />
              <label>
                <b>Location:</b>

                <select
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  required
                >
                  <option value="">select</option>
                  <option value="Thane">Thane</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Nashik">Nashik</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Ahmednagar">Ahmednagar</option>
                  <option value="Solapur">Solapur</option>
                </select>
              </label>
              <br />
              <label>
                <b>Category:</b>

                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                >
                  <option value="">select</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Butcher">Butcher</option>
                  <option value="Baker">Baker</option>
                  <option value="Chemist">Chemist</option>
                  <option value="Stationary">Stationary</option>
                </select>
              </label>
              <br />

              <label>
                <b>Opening Date:</b>

                <input
                  type="date"
                  className={classes.date}
                  onChange={(e) => setOpeningdate(e.target.value)}
                  value={openingdate}
                  required
                />
              </label>
              <br />
              <label>
                <b>Closing Date :</b>
                <input
                  type="date"
                  className={classes.date}
                  onChange={(e) => setclosingingdate(e.target.value)}
                  value={closingdate}
                  required
                />
                <div className={classes.error2}>{errorDate}</div>
              </label>
              <button className={classes.btn_add} type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
