import './App.css';
import {useState, useRef, useEffect} from 'react';
import { DiagramComponent, DiagramTools, NodeModel} from "@syncfusion/ej2-react-diagrams";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
function App() {
  const diagramObject = useRef<DiagramComponent>(null);
  let diagramInstance = diagramObject.current;
  const [nodes, setNodes] = useState<NodeModel[]>([
    {
      offsetX:300,
      offsetY:250,
      width:200,
      height:100,
      annotations:[{content:"Flow"}, {content:"Terminator", offset:{y:0.6}}],
      style : {fill:'lightblue', strokeColor:'white'},
      shape:{type : "Flow", shape:"Terminator"},
    }
  ])
  useEffect(()=>{
    diagramInstance = diagramObject.current;
    diagramInstance?.add(nodes[0]);
  })
  const drawNode =()=>{
    if(diagramInstance){
      diagramInstance.tool = DiagramTools.ContinuousDraw;
      diagramInstance.drawingObject = {shape : {type : "Basic", shape:"Rectangle"}}
    }
  }
  const editNode = () =>{
    if(nodes.length > 0){
      const updateNodes = nodes.map((node, index)=>{
        if(index === 0 ){
          return {
            ...node,
            width:400, height:200,
            style : {...node.style,
              fill:'orange', strokeColor:'blue'
            }
          }
        }
        return node;
      })
      setNodes(updateNodes);
    }
  }
  const removeNode = () =>{
    diagramObject.current?.remove(nodes[0]);
  }
  return (
    <div style={{ margin: "0px 0px 0px 20px" }}>
      <div className='container'>
        <ButtonComponent cssClass='button' onClick={drawNode}>Draw Node</ButtonComponent>
        <ButtonComponent cssClass='button' onClick={editNode}>Edit Node</ButtonComponent>
        <ButtonComponent cssClass='button' onClick={removeNode}>Remove Node</ButtonComponent>
      </div>
      <DiagramComponent
        height={"620px"}
        width={"100%"}
        //nodes = {nodes}
        ref = {diagramObject}
      />
    </div>
  );
}

export default App;
