
import React, { Component } from 'react';
import './App.css';

class TopMinus extends Component {
  render() {
    return (
        <div id="top_minus" className="btn btn-minus" onClick={this.props.click} >-</div>
    );
  }
}

class LeftMinus extends Component {
  render() {
    return (
        <div id="left_minus" className="btn btn-minus" onClick={this.props.click} >-</div>
    );
  }
}

class RightPlus extends Component {
  render() {
    return (
        <div id="right_plus" className="btn btn-plus" onClick={this.props.click} >+</div>
    );
  } 
}

class BottomPlus extends Component {
  render() {
    return (
      <div id="bottom_plus" className="btn btn-plus" onClick={this.props.click} >+</div>
    );
  }
}






class App extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      initialHeight : 4,
      initialWidth : 4,
      cellSize : 50
    }
   
  }



  render(){
      
      let cellSize = this.state.cellSize;
      let rows = [];
      for (let i = 0; i < this.state.initialHeight ; i++){
        let rowID = i
        let cell = []
        for (let idx = 0; idx < this.state.initialWidth ; idx++){
          let cellID = idx
          cell.push(<td key={cellID} data-cell-index={cellID} style={{height: cellSize, width: cellSize}}>{cellID}</td>)
        }
        rows.push(<tr key={i} data-row-index={rowID}>{cell}{rowID}</tr>)
      }

    return(
      <div className="simpleComponent">
        <BottomPlus click={(evt) => this.plusRow(evt)}/>
        <RightPlus click={(evt) => this.plusCell(evt)}/>
        <LeftMinus click={(evt) => this.minusRow(evt)}/>
        <TopMinus click={(evt) => this.minusColumn(evt)}/>
        <table id="table" onMouseOver={(evt) => this.tablecellMouseOver(evt)} onClick={(evt) => this.handleLoginClick(evt)}>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }


  handleLoginClick(evt) {
    
   /* var initialHeight = this.state.initialHeight

    var cell = [];
      for (var i = 0; i < initialHeight; i++) {
        cell.push(i);
      }
    console.log(cell[3]);*/
    
  }

 

  plusCell(evt){
    this.setState({initialWidth: this.state.initialWidth +1});
  }

  plusRow(evt){
    this.setState({initialHeight: this.state.initialHeight +1});
  }


  minusColumn(evt){
    //this.setState({initialWidth: this.state.initialWidth -1});


    //работпет
    let indexColumn = evt.target.getAttribute('btn-data-colunm-index');
    const allRows = document.getElementsByTagName('tr');

    Array.from(allRows).forEach(function(row) {
      row.deleteCell(indexColumn);
    });
    //работпет

  }

  minusRow(evt){
    //this.setState({initialHeight: this.state.initialHeight -1});
    const allRows = document.getElementsByTagName('tr');
    //console.log(allRows.length)
    let attributeRowIndex = evt.target.getAttribute('btn-data-row-index');
    document.getElementById("table").deleteRow(attributeRowIndex);

    console.log(allRows.length);
   // this.setState({initialHeight: this.state.initialHeight = allRows.length});

    
   
    
  }

  tablecellMouseOver(evt) {
    const tableCellElement = evt.target instanceof HTMLTableCellElement
    const leftMinusBtn = document.getElementById('left_minus');
    const topMinusBtn = document.getElementById('top_minus');
    let curentCellIndex = evt.target.offsetLeft + 1;
    let curentRowIndex = evt.target.parentNode.offsetTop + 1;

    {tableCellElement ? 
       (leftMinusBtn.style.cssText = 'margin-top:'+ curentRowIndex +'px; display:flex;',
        topMinusBtn.style.cssText = 'margin-left:'+ curentCellIndex +'px; display:flex;')
       :
       (null)
    }

    let cellIndex = evt.target.getAttribute('data-cell-index');
    let rowIndex = evt.target.parentNode.getAttribute('data-row-index');
    leftMinusBtn.setAttribute('btn-data-row-index', rowIndex);
    topMinusBtn.setAttribute('btn-data-colunm-index', cellIndex);
  }

}

export default App;

