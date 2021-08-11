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
          {this.state.article ? (
            <div className="hero-body mx-6">
              <div className="is-size-1">{this.state.article.title}</div>

              <div className="subtitle has-text-success">
                {" "}
                {this.state.article.description}
              </div>

              <div className="level">
                <div className="level-left">
                  <figure class="image is-48x48 ">
                    <img
                      className="is-rounded"
                      src={this.state.article.author.image}
                      alt="profile"
                    />
                  </figure>
                  <span className="ml-4">
                    {this.state.article.author.username}
                  </span>
                  <span className="ml-4">
                    {`${this.state.article.createdAt.split("T")[0]}`}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="mx-6 py-6  px-6 ">
          <div className="is-size-5 has-text-justified article-body">
            {this.state.article ? this.state.article.body : <div className="articles-loading"> "Loading..."</div>}
          </div>
        </div>
      </>
    );
  }
}

export default Article;
