import React, { Component } from 'react';
import ReactMDL from 'react-mdl';

var MDLite = require('./material');
var componentHandler = MDLite.componentHandler;
var colorList= ["red","pink","purple","deep-purple","indigo","blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey"];



var getmdlSelect = {
            defaultValue: {width: 300}, addEventListeners: function (e) {
                var t = e.querySelector("input"), n = e.querySelectorAll("li"), l = e.querySelector(".mdl-js-menu");
                t.onkeydown = function (e) {
                    38 != e.keyCode && 40 != e.keyCode || l.MaterialMenu.show()
                }, l.onkeydown = function (e) {
                    13 == e.keyCode && t.focus()
                }, [].forEach.call(n, function (n) {
                    n.onclick = function () {

                        var content = n.textContent.replace(/\s/g, '');
                        document.getElementById('sample1').style.color = content;
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

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="name"/>
                <label className="mdl-textfield__label" htmlFor="name">Name</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="abbreviation"/>
                <label className="mdl-textfield__label" htmlFor="abbreviation">Abbreviation</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <textarea className="mdl-textfield__input" type="text" id="info"></textarea>
                <label className="mdl-textfield__label" htmlFor="info">Info</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fullwidth">
                <input className="mdl-textfield__input" type="text" id="sample1" value="" readOnly tabIndex="-1"/>

                <label htmlFor="sample1" className="mdl-textfield__label">Color</label>

                <ul htmlFor="sample1" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" style={{"height":"25vh","overflow": "auto"}}>

                    {colorList.map(function(color){ 
                         return(
                            <li className="mdl-menu__item">
                                <div className={'circle '+color}></div>
                                <div styles ="padding-left:50px; position: static">{color}</div>
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

export default Dialog;