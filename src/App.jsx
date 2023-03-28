import logo from "./logo.svg";
import "./App.css";
import { item } from "./Helper/data";
import { useEffect, useState } from "react";
//This is Eftakhar Jaman, to built this cool fnacy feature I used JavaScript dom events (onDragStart, onDragOver and onDrop it is very simple to implement)
function App() {
  const [drgData, setDrgData] = useState([]);
  const [isdelete, setIsDelete] = useState(false);
  const [isinsert, setIsInsert] = useState(false);
  const [dragItem, setDrgItem] = useState("");
  // const [customColor,setCustomColor] = useState("000000");
  const dragStart = (e, data, resn = 0) => {
    console.log("data ", data);

    if (resn === 2) {
      data = JSON.stringify(data);
      console.log("Draging for delete");
      e.dataTransfer.setData("delId", data);
    } else {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      console.log("Draging for insert");
      e.dataTransfer.setData("itemId", data);
    }
  };
  const dragOver = (e, resn = 0) => {
    e.preventDefault();

    if (resn === 2) {
      console.log("Drag over delete!");
    } else {
      console.log("Drag over insert!");
    }
  };
  const dragDrop = (e, resn = 0) => {
    const data = [];
    let transferData;
    let modifiedData;

    if (resn === 2) {
      console.log("Data droped for delete!");
      transferData = e.dataTransfer.getData("delId");
      if (transferData) {
        modifiedData = JSON.parse(transferData);
        let filteredData = drgData.filter(
          (dto, idx) => dto?.id !== modifiedData?.id
        );
        transferData ? setDrgData(filteredData) : setDrgData([]);
        setDrgItem(modifiedData?.name);
        setIsDelete(true);
      }
    } else {
      console.log("Data droped for insert!");
      transferData = e.dataTransfer.getData("itemId");
      if (transferData) {
        modifiedData = JSON.parse(transferData);
        data.push({ ...modifiedData, id: drgData.length + 1 });
        transferData ? setDrgData([...drgData, ...data]) : setDrgData([]);
        setDrgItem(modifiedData?.name);
        setIsInsert(true);
      }
    }
    console.log(transferData);
  };
  console.log(drgData);

  useEffect(() => {
    if (isdelete) {
      setTimeout(() => {
        setIsDelete(false);
      }, 1500);
    }
    if (isinsert) {
      setTimeout(() => {
        setIsInsert(false);
      }, 1500);
    }
  }, [isdelete, isinsert]);
  // useEffect(()=>{
  //   let customColor = Math.random() * 100000
  //   setCustomColor(customColor);
  // },[dragItem])
  return (
    <div className="App-container" style={{ display: "flex", gap: "10px" }}>
      <div className="left" style={{ width: "25%", height: "100vh" }}>
        {isinsert && (
          <p
            style={{ color: "green", textAlign: "center" }}
          >{`${dragItem} inserted successfully!`}</p>
        )}

        <ul style={{ listStyle: "none", margin: "5px", padding: "0" }}>
          {item.map((itm, idx) => {
            let customColor = parseInt(
              Math.floor(Math.random() * (90000 - 10000 + 1)) + 900000
            );
            console.log("color: ", customColor);
            return (
              <li
                key={idx}
                style={{
                  padding: "10px 5px",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  margin: "10px auto",
                  minWidth: "90%",
                  textAlign: "center",
                  cursor: "grab",
                  backgroundColor: `#${customColor}`,
                  color: "#ffffff",
                }}
                draggable
                onDragStart={(e) =>
                  dragStart(
                    e,
                    JSON.stringify({
                      name: itm?.name,
                      key: itm?.key,
                      bgc: `#${customColor}`,
                    }),
                    1
                  )
                }
              >
                {itm?.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="right" style={{ width: "75%", height: "100vh" }}>
        <div
          droppable
          onDragOver={(e) => dragOver(e, 1)}
          onDrop={(e) => dragDrop(e, 1)}
          style={{
            margin: "10px auto",
            boxSizing: "border-box",
            height: "75%",
            width: "100%",
            border: "1px solid gray",
            borderRadius: "7px",
            overflow: "auto",
            display: "flex",
            gap: "5px",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          {drgData.map((itm, idx) => {
            return (
              <div
                draggable
                onDragStart={(e) =>
                  dragStart(
                    e,
                    { name: itm?.name, key: itm?.key, id: itm?.id },
                    2
                  )
                }
                key={idx}
                style={{
                  padding: "10px 5px",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  margin: "10px auto",
                  width: "30%",
                  textAlign: "center",
                  cursor: "grab",
                  height: "40px",
                  backgroundColor: `${itm?.bgc}`,
                  color: "#ffffff",
                }}
              >
                {console.log(itm)}
                {itm?.name}
              </div>
            );
          })}
          <h1
            className="dnd"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              color: "gray",
            }}
          >
            <pre>Select Item Drag and Drop (try at pc browser)</pre>
          </h1>
        </div>

        <div
          droppable
          onDragOver={(e) => dragOver(e, 2)}
          onDrop={(e) => dragDrop(e, 2)}
          style={{
            width: "140px",
            height: "20%",
            margin: "10px auto",
            border: "1px solid blue",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          {isdelete && (
            <p
              style={{ textAlign: "center", color: "red" }}
            >{`${dragItem} deleted successfully!`}</p>
          )}

          <p className="trash-text">Drag to Trash</p>
        </div>
      </div>
    </div>
  );
}

export default App;
