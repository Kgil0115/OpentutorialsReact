import React, {Component} from 'react';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import Control from "./components/Control"
import './App.css';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'read',
      selected_content_id: 3,
      subject:{title:'WEB', sub:'World wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'Javascript', desc:'Javascript is for interactive'}
      ]
    }
  }
  render() {
    var _title, _desc, _article= null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>

    } else if ( this.state.mode === 'read'){
      var i =0;
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title =data.title;
          _desc = data.desc;
          break;
        }
        i= i + 1;
      }
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>

    } else if (this.state.mode === 'create'){
      _article=<CreateContent title={_title} desc={_desc}></CreateContent>
    }
      

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          // 내가 만든 이벤트
          onChangePage = {function(){
            this.setState({
              mode:'welcome',
              welcome :{title:'Welcome2', desc:'Hello, React2!!'}
            });
          }.bind(this)}
        >
        </Subject>
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)} 
          data={this.state.contents} //data 라는 props를 통해 값전달
        ></TOC>
           {/*하위컴포넌트의 Control로부터 mode값 전달 받아 변경  */}
          <Control onChangeMode={function(_mode){ 
            this.setState({
              mode:_mode
            })
          }.bind(this)}></Control>
          {_article}

      </div>
    );
  }

}

export default App;
