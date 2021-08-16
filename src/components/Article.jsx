import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      favorited: false,
      status: null,
      cstatus: null,
      comments: [],

      cbody: null,
    };
  }
  async componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.userInfo
          ? `Bearer ${this.props.userInfo.token}`
          : null,
      },
    };

    await fetch(
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
    await fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}/comments`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.comments.length !== 0) {
          this.setState({
            comments: data.comments,
          });
        }
      });
  }
  handleChange = (e) => {
    if (e.target.name === "cbody") {
      this.setState({
        cbody: e.target.value,
      });
    }
  };
  handleClick = (e) => {
    console.log(e.target.dataset.id);
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
      console.log("deletedddddddd");
      this.setState(
        {
          status: "loading",
        },
        () => {
          const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.props.userInfo.token}`,
            },
          };
          fetch(
            `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}`,
            requestOptions
          ).then(() => {
            this.props.history.push(
              `/profiles/${this.props.userInfo.username}`
            );
          });
        }
      );
    } else if (e.target.dataset.id === "comment") {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.userInfo.token}`,
        },
        body: JSON.stringify({
          comment: {
            body: this.state.cbody,
          },
        }),
      };
      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}/comments`,
        requestOptions
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          this.setState((prevValue) => {
            return {
              comments: prevValue.comments.concat(data.comment),
              cstatus:'loaded'
            };
          });
        });
    } else if (e.target.dataset.id === "cdelete") {
      this.setState(
        {
          cstatus: "loading",
        },
        () => {
          const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.props.userInfo.token}`,
            },
          };
          fetch(
            `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}/comments/${e.target.dataset.commentid}`,
            requestOptions
          ).then(() => {
            this.setState(
              {
                cstatus: null,
              },
              () => {
                this.props.history.push(
                  `/articles/${this.props.match.params.slug}`
                );
              }
            );
          });
        }
      );
    }
  };
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
                            className="fas fa-heart "
                            data-id="heart"
                            onClick={this.handleClick}
                          ></i>
                        </span>
                        <span className="is-size-6 mx-2">
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
                        <Link
                          to={`/article/edit/${this.state.article.slug}`}
                          className="button"
                        >
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
            <div className="mx-6 py-6  px-6 article-body">
              <div className="is-size-5 has-text-justified ">
                {this.state.article ? (
                  this.state.article.body
                ) : (
                  <div className="articles-loading"> "Loading..."</div>
                )}
              </div>
            </div>
            <div className="has-background-light  p-6">
              <div className="title mx-6">Comments</div>
              {this.props.userInfo ? (
                <div className=" px-6 comment-form">
                  <div class="field">
                    <p class="control">
                      <textarea
                        class="textarea p-3"
                        name="cbody"
                        placeholder="Drop your thoughts here..."
                        value={this.state.cbody}
                        onChange={this.handleChange}
                      />
                    </p>
                  </div>
                  <div class="field ">
                    <p class="control level ">
                      <div className="level-left"></div>
                      <button
                        class="button level-right is-success"
                        onClick={this.handleClick}
                        data-id="comment"
                      >
                        Add Comment
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="mx-6 py-6 comments">
                {this.state.comments.length !== 0 ? (
                  this.state.comments.map((comment) => {
                    return (
                      <div className="comment my-4 columns">
                        <div className="column is-1 pl-5">
                          <figure class="image is-48x48 mr-2">
                            <img
                              className="is-rounded"
                              src={
                                comment.author.image
                                  ? comment.author.image
                                  : "https://static.productionready.io/images/smiley-cyrus.jpg"
                              }
                              alt="profile"
                            />
                          </figure>
                        </div>
                        <div className="column is-11 py-2">
                          <div className="level">
                            <div className="level-left">
                              <div className="is-size-5 has-text-weight-bold is-capitalized">
                                {comment.author.username}{" "}
                                <span className="is-size-6 has-text-info-dark has-text-weight-normal">{` #${
                                  comment.createdAt.split("T")[0]
                                }`}</span>
                              </div>
                            </div>
                            <div className="level-right">
                              <span class="icon pointer-link is-small has-text-danger">
                                <i
                                  class="fas fa-trash"
                                  data-commentid={comment.id}
                                  data-id="cdelete"
                                  onClick={this.handleClick}
                                ></i>
                              </span>
                            </div>
                          </div>
                          <div className="is-size-6 mt-2 has-text-weight-bold has-background-warning-light p-4">
                            {comment.body}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="has-text-weight-bold subtitle px-2 py-4">
                    No Articles Yet!
                  </div>
                )}
                {/* {!this.state.comments.length===0? (
                  ""
                ) : (
                  <div className="has-text-weight-bold subtitle px-2 py-4">
                    No comments Yet!
                  </div>
                )} */}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default withRouter(Article);
