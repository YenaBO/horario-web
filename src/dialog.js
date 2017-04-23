import React, { Component } from 'react';
import ReactMDL from 'react-mdl';

var MDLite = require('./material');
var componentHandler = MDLite.componentHandler;
var colorList= ["red","pink","purple","deep-purple","indigo","blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey"];
var colorListInt = [0xFFF44336, 0xFFE91E63,0xFF9C27B0,0xFF673AB7,0xFF3F51B5, 0xFF2196F3, 0xFF0097A7, 0xFF009688, 0xFF43A047,0xFF8BC34A,0xFFCDDC39, 0xFFFFEB3B,0xFFFFC107,0xFFFF9800,0xFFFF5722,0xFF795548,0xFF9E9E9E];
var colorString="grey";
var getmdlSelect = {
            defaultValue: {width: 300}, addEventListeners: function (e) {
                var t = e.querySelector("input"), n = e.querySelectorAll("li"), l = e.querySelector(".mdl-js-menu");
                t.onkeydown = function (e) {
                    38 != e.keyCode && 40 != e.keyCode || l.MaterialMenu.show()
                }, l.onkeydown = function (e) {
                    13 == e.keyCode && t.focus()
                }, [].forEach.call(n, function (n) {
                    n.onclick = function () {

                        var content = n.textContent;
                        document.getElementById('color').style.color = content;
                        colorString = content;

                        if (t.value = content, e.MaterialTextfield.change(content), setTimeout(function () {
                                e.MaterialTextfield.updateClasses_()
                            }, 250), t.dataset.val = n.dataset.val || "", "createEvent" in document) {
                            var o = document.createEvent("HTMLEvents");
                            o.initEvent("change", !1, !0), l.MaterialMenu.hide(), t.dispatchEvent(o)
                        } else t.fireEvent("onchange")
                    }
                })
            }, init: function (e, t) {
                var n = document.querySelectorAll(e);
                [].forEach.call(n, function (e) {
                    getmdlSelect.addEventListeners(e);
                    var n = t ? t : e.querySelector(".mdl-menu").offsetWidth ? e.querySelector(".mdl-menu").offsetWidth : getmdlSelect.defaultValue.width;
                    e.style.width = n + "px"
                })
            }
        };

  class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog;
    this.handleCloseDialog = this.handleCloseDialog;
    this.getText = this.getText.bind(this)

  }
  getText(e) {
    this.props.getValaaa(e.target.value);
    this.props.getIdaaa(e.target.id)
  }

  componentDidMount(){

   

     getmdlSelect.init(".getmdl-select"), document.addEventListener("DOMNodeInserted", function (e) {
                e.relatedNode.querySelectorAll(".getmdl-select").length > 0 && componentHandler.upgradeDom()
            }, !1)

  }

  
  render() {
    return (
          <div>
          <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-icon">label</i>
          Add subject
        </span>
        </li>
            <form action="#">

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="divName">
                <input className="mdl-textfield__input" type="text" id="name" onChange={this.getText}/>
                <label className="mdl-textfield__label" htmlFor="name">Name</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="divAbb">
                <input className="mdl-textfield__input" type="text" id="abbreviation" onChange={this.getText}/>
                <label className="mdl-textfield__label" htmlFor="abbreviation">Abbreviation</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="divInfo">
                <textarea className="mdl-textfield__input" type="text" id="info" onChange={this.getText}></textarea>
                <label className="mdl-textfield__label" htmlFor="info">Info</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fullwidth ">
                <input className="mdl-textfield__input" type="text" id="color" value="grey" readOnly tabIndex="-1" onclick={this.colorPick}/>

                <label htmlFor="color" className="mdl-textfield__label">Color</label>

                <ul htmlFor="color" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" style={{"height":"25vh","overflow": "auto"}} >

                    {colorList.map(function(color){ 
                         return(
                            <li className="mdl-menu__item" >
                                <div className={'circle '+color} ></div>
                                <div styles ="padding-left:50px; position: static" >{color}</div>
                            </li>)
                     
                    }.bind(this))}

                    
                </ul>

            </div>

        </form>
         <div class="mdl-dialog__actions mdl-dialog__actions">
        <button type="button" className="mdl-button ok">OK</button>
        <button type="button" className="mdl-button close">CLOSE</button>
    </div>
          </div>
    );
  }
}

export {colorList, colorListInt,colorString};

export default Dialog;