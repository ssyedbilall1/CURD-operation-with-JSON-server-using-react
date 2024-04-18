import React, { useState, useEffect } from "react";
//@import react toast
import { toast } from "react-toastify";
//@import styles
import styles from "./index.module.scss";
//@import button component
import Button from "../../component/button";

const Modal = ({ onClose, itemId }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("table");
  const [currentValue, setCurrentValue] = useState("");
  const [totalValue, setTotalValue] = useState("");

  useEffect(() => {
    if (itemId) {
      fetch(`http://localhost:8000/inputData/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setType(data.type);
          setCurrentValue(data.currentValue);
          setTotalValue(data.totalValue);
        })
        .catch((err) => {
          console.log("Failed: " + err.message);
        });
    }
  }, [itemId]);

  const validate = () => {
    let proceed = true;
    let errorMessage = "Please enter details in ";
    switch (true) {
      case name === null || name === "":
        proceed = false;
        errorMessage += "Name";
        break;
      case type === null || type === "":
        proceed = false;
        errorMessage += " Type";
        break;
      case currentValue === null || currentValue === "":
        proceed = false;
        errorMessage += " Current value";
        break;
      case totalValue === null || totalValue === "":
        proceed = false;
        errorMessage += " Total value";
        break;
      default:
        break;
    }
    if (!proceed) {
      toast.warning(errorMessage);
    }
    return proceed;
  };

  const handleCreate = () => {
    if (validate()) {
      let inputValue = { name, type, currentValue, totalValue };
      fetch("http://localhost:8000/inputData", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputValue),
      })
        .then((res) => {
          toast.success("Data inserted successfully");
          onClose();
        })
        .catch((err) => {
          console.log("Failed: " + err.message);
        });
    }
  };

  const handleUpdate = () => {
    if (validate()) {
      let inputValue = { name, type, currentValue, totalValue };
      fetch(`http://localhost:8000/inputData/${itemId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputValue),
      })
        .then((res) => {
          toast.success("Data updated successfully");
          onClose();
        })
        .catch((err) => {
          console.log("Failed: " + err.message);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <p className={styles.close} onClick={() => onClose()}>
            X
          </p>
        </div>
        <div className={styles.modalContent}>
          <form className={styles.formWrapper} onSubmit={handleSubmit}>
            <label className={styles.labelWrapper}>Name:</label>
            <input
              type="text"
              value={name}
              className={styles.inputBox}
              onChange={(e) => setName(e.target.value)}
            />
            <label className={styles.labelWrapper}>Type:</label>
            <select
              className={styles.inputBox}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="table">table</option>
              <option value="chart">chart</option>
            </select>
            <label className={styles.labelWrapper}>Current Value:</label>
            <input
              type="number"
              value={currentValue}
              className={styles.inputBox}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
            <label className={styles.labelWrapper}>Total Value:</label>
            <input
              type="number"
              value={totalValue}
              className={styles.inputBox}
              onChange={(e) => setTotalValue(e.target.value)}
            />
            <div className={styles.modalFooter}>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
