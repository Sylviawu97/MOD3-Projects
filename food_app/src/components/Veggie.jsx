import React, { useEffect, useState } from "react";
import axios from "axios";

function Veggies() {
  const [veggies, setVeggies] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [canEat, setCanEat] = useState(false);

  useEffect(() => {
    fetchVeggies();
  }, []);

  const fetchVeggies = async () => {
    try {
      const response = await axios.get("http://localhost:4001/veggies");
      setVeggies(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVeggie = {
      name,
      color,
      canEat,
    };

    try {
      await axios.post("http://localhost:4001/create_veggie", newVeggie);
      fetchVeggies(); // Fetch veggies again to update the list
      setName("");
      setColor("");
      setCanEat(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    if (name === "name") {
      setName(inputValue);
    } else if (name === "color") {
      setColor(inputValue);
    } else if (name === "canEat") {
      setCanEat(inputValue);
    }
  };

  return (
    <>
      <form id="create-veggies-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Veggie Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="color">Veggie Color</label>
          <input
            type="text"
            name="color"
            value={color}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="canEat">Can Eat Veggie?</label>
          <input
            type="checkbox"
            name="canEat"
            checked={canEat}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <section id="display-veggies">
        {veggies.map((veggie) => (
          <div key={veggie._id} className={veggie.canEat ? "green" : "red"}>
            {veggie.name}
          </div>
        ))}
      </section>
    </>
  );
}

export default Veggies;
