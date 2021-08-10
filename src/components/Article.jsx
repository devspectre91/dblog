import React, { Component } from "react";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
    };
  }
  componentDidMount() {
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({
          article: data.article,
        });
      });
  }
  render() {
    return (
      <>
        <div className="hero is-dark is-small py-6">
          <div className="hero-body mx-6">
            <div className="is-size-1">
              {this.state.article ? this.state.article.title : "not found"}
            </div>
           
               <div className="subtitle has-text-warning">  {this.state.article
                    ? this.state.article.description
                    : "not found"}</div>
     
            <div className="level">
              <div className="level-left">
                <figure class="image is-48x48 ">
                  {this.state.article ? (
                    <img
                      className="is-rounded"
                      src={this.state.article.author.image}
                    />
                  ) : (
                    "not found"
                  )}
                </figure>
                <span className="ml-4">
                  {" "}
                  {this.state.article
                    ? this.state.article.author.username
                    : "not found"}
                </span>
                <span className="ml-4">
                  {this.state.article
                    ? `${this.state.article.createdAt.split("T")[0]} `
                    : "not found"}
                </span>
              </div>
            </div>
          </div>
        </div>
       <div className='mx-6 py-6  px-4 '>
       <div className="is-size-5 has-text-justified article-body">{this.state.article
                    ? this.state.article.body
                    : "not found"}</div>
       </div>
    
      </>
    );
  }
}

export default Article;
