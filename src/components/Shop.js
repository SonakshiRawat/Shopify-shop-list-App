import classes from "./Shop.module.css";

function Shop(props) {
  // console.log(props.details.url)
  function deleting() {
    props.listAfterDeletion(props.details.name);
  }

  return (
    <div className={classes.shop}>
      <img
        src={props.details.url}
        alt="unavailable"
        className={classes.shop_img}
      />
      <div className={classes.details}>
        <div className={classes.shopname}>{props.details.name}</div>
        <div className={classes.subdetails}>
          Located At:
          <span className={classes.ans}>{props.details.location}</span>
        </div>
        <div className={classes.subdetails}>
          Category:<span className={classes.ans}>{props.details.category}</span>
        </div>
        <div className={classes.time}>
          <div className={classes.subdetails}>
            Opening Date:
            <span className={classes.ans}>{props.details.openingdate}</span>
          </div>
          <div className={classes.subdetails}>
            Closing Date:
            <span className={classes.ans}>{props.details.closingdate}</span>
          </div>
        </div>
        <button className={classes.delete} onClick={deleting}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Shop;
