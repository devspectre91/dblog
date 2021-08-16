import React, { Component } from "react";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      favorited: false,
    };
  }
  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.userInfo
          ? `Bearer ${this.props.userInfo.token}`
          : null,
      },
    };

    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}`,
      requestOptions
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({
          article: data.article,
          favorited: data.article.favorited,
        });
      });
  }

  handleClick = (e) => {
    if (e.target.dataset.id === "heart") {
      this.setState(
        (prevValue) => {
          return { favorited: !prevValue.favorited };
        },
        () => {
      console.log(this.state.favorited)
      const requestOptions = {
        method: this.state.favorited ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.userInfo.token}`,
        },
      };
      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}/favorite`,
        requestOptions
      ).then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({
          article: data.article,
          favorited: data.article.favorited,
        });
      });
        }
      );
    }
  };
  render() {
    return (
      <>
        <div className="hero is-dark is-small py-6">
          {this.state.article ? (
            <div className="hero-body mx-6">
              <div className="is-size-1">{this.state.article.title}</div>

              <div className="subtitle has-text-success has-text-justified">
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
                {this.props.userInfo ? (
                  <div className="level-right ">
                  
                    <span
                      className={
                        this.state.favorited
                          ? "pointer-link has-text-danger"
                          : "pointer-link"
                      }
                    >
                      <i
                        className="fas fa-heart fa-2x"
                        data-id="heart"
                        onClick={this.handleClick}
                      ></i>
                    </span> 
                    <span className='is-size-5 mx-2'> {this.state.article.favoritesCount}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="level">
                <div className="tags">
                  {this.state.article.tagList.map((tag) => {
                    return <div className="tag is-danger">{tag}</div>;
                  })}
                </div>
               
              </div>
            </div>
          ) : (
            <div className="articles-loading mx-6 px-6 py-6 is-size-4">
              {" "}
              "Loading.."
            </div>
          )}
        </div>
        <div className="mx-6 py-6  px-6 ">
          <div className="is-size-5 has-text-justified article-body">
            {this.state.article ? (
              this.state.article.body
            ) : (
              <div className="articles-loading"> "Loading..."</div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Article;
