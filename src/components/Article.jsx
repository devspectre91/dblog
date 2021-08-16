import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      favorited: false,
      status: null,
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
    console.log(e.target.dataset.id)
    if (e.target.dataset.id === "heart") {
      this.setState(
        (prevValue) => {
          return { favorited: !prevValue.favorited };
        },
        () => {
          console.log(this.state.favorited);
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
      );
    } else if (e.target.dataset.id === "delete") {
      console.log("delete");
      this.setState({
        status: "loading",
      },()=>{
        const requestOptions = {
          method:"DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.userInfo.token}`,
          },
        };
        fetch(
          `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}`,
          requestOptions
        ).then(()=>{
          this.props.history.push(`/profiles/${this.props.userInfo.username}`)
        })
       
      });
    }
  }
  render() {
    return (
      <>
        {this.state.status === "loading" ? (
          <div className=" py-5 pb-6 px-4 column articles-loading is-half is-size-2 has-text-centered has-text-info-dark">
            {" "}
            "Deleting Article..."
          </div>
        ) : (
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
                        <span className="is-size-5 mx-2">
                          {" "}
                          {this.state.article.favoritesCount}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="level">
                    <div className="tags mt-4  level-left">
                      {this.state.article.tagList.map((tag) => {
                        return <div className="tag is-danger">{tag}</div>;
                      })}
                    </div>
                    {this.props.userInfo &&
                    this.props.userInfo.username ===
                      this.state.article.author.username ? (
                      <div className="level-right buttons">
                        <Link to="/article/edit" className="button">
                          Edit
                        </Link>
                        <div
                          data-id="delete"
                          onClick={this.handleClick}
                          className="button is-danger"
                        >
                          Delete
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
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
              )
            </div>
          </>
        )}
      </>
    );
  }
}

export default withRouter(Article);
