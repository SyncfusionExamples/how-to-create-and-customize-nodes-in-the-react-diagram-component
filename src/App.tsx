import './App.css';
import {useState, useRef} from 'react';
import { DiagramComponent, NodeModel, DiagramTools } from "@syncfusion/ej2-react-diagrams";

function App() {
  const diagramRef = useRef<DiagramComponent>(null);
  const [nodeCollection, setNodeCollection] = useState<NodeModel[]>([
    {
      id : "custom_Node",
      width : 100,
      height: 100,
      offsetX : 300, 
      offsetY: 100,
      style : {
        fill : "#59A7FF",
        strokeColor: "black",
        strokeWidth : 2
      }
    },
  ])
  const addNode = () =>{
    const newNode : NodeModel= {
      id:"new_Node",
      width: 100,
      height: 100,
      offsetX:300,
      offsetY:400,
      style :{
        fill : "#59A7FF",
        strokeWidth:2, strokeColor:"black"
      }
    }
    setNodeCollection([...nodeCollection,newNode]);
  }
  const toggleDrawingMode = () =>{
    if(diagramRef.current){
      if(diagramRef.current.tool === DiagramTools.ContinuousDraw){
        diagramRef.current.tool = DiagramTools.Default;
      }
      else{
        diagramRef.current.tool = DiagramTools.ContinuousDraw;
        diagramRef.current.drawingObject = {
          height:100,
          width:100,
          shape :{
            type : "Basic",
            shape:"Rectangle"
          },
          style :{fill: "#59A7FF", strokeColor:"black", strokeWidth:2},
          annotations :[{content:"Drawn Nodes"}]
        }
      }
    }
  }
  const editNode = () =>{
    if(nodeCollection.length  >0){
      const updatedNodes = nodeCollection.map((node, index)=>{
        if(index === 0){
          return{
            ...node,
            style :{
              strokeColor :"yellow",
              fill :"#f2f2f2"
            },
            annotations : [{content: "Edited Node"}]
          }
          
        }
        return node;
      })
      setNodeCollection(updatedNodes);
    }
  }
  const removeNode = ()=>{
    if(nodeCollection.length >0){
      diagramRef.current?.remove(nodeCollection[0]);
      setNodeCollection(nodeCollection.slice(0, -1))
    }
  }
  return (
    <div style={{ margin: "0px 0px 0px 20px" }}>
    <div style = {{display:"flex", gap:10, padding:20}}>
      <button onClick={addNode}>Add Node</button>
      <button onClick={toggleDrawingMode}>Toggle Drawing Mode</button>
      <button onClick = {editNode}>Edit Node</button>
      <button onClick = {removeNode}>Remove Node</button>
    </div>
      <DiagramComponent
        ref = {diagramRef}
        height={"620px"}
        width={"100%"}
        nodes = {nodeCollection}
      />
    </div>
  );
}

export default App;
