import React, {Component} from 'react';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Control from "./components/Control"
import './App.css';



class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 1,
      subject:{title:'WEB', sub:'World wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'Javascript', desc:'Javascript is for interactive'}
      ]
    }
  }

  getReadContent(){
    var i =0;
    while(i<this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i= i + 1;
    }
  }
  getContent(){
    var _title, _desc, _article= null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>

    } else if ( this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article=<ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    } else if (this.state.mode === 'create'){
      _article=<CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id +1; // contents갯수 추가
        // push를 사용하면 배열 자체가 달라지므로 배열은 유지하도록 concat 사용
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
        this.setState({
          contents:_contents,
          mode: 'read',
          selected_content_id: this.max_content_id 
        });
        //title={_title} desc={_desc}
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update'){
      _content = this.getReadContent();
      _article=<UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i< _contents.length){
            console.log("whild문");
            if(_contents[i].id === _id){
              console.log("id: "+ _contents[i].id);
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
        this.setState({
          contents:_contents,
          mode: 'read'
        });
        //title={_title} desc={_desc}
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {
    
    
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
            if(_mode === 'delete'){
              if(window.confirm('삭제하시겠습니까?')){
                // confirm에서 확인 누르면 
                var _contents = Array.from(this.state.contents);
                var i =0;
                while(i<_contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i, 1);
                    break;
                  }

                  i= i + 1;
                }
                this.setState({
                  mode:'welcome',
                  contents:_contents
                })
              }
            } else {
              this.setState({
                mode:_mode
              });
            }
            
          }.bind(this)}></Control>
          {this.getContent()}

      </div>
    );
  }
}

export default App;
