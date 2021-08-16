import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      noOfPages: 1,
      currentTag: null,
      tags: null,
      currentPage: 1,
      breadcrumb: "feed",
    };
  }

  async componentDidMount() {
    if (this.props.userInfo) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.userInfo.token}`,
        },
      };
      await fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/feed?limit=10`,
        requestOptions
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data.articles.length);
          return data.articles;
        })
        .then((data) => {
          this.setState({
            articles: data,
          });
        });

      await fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/feed`,
        requestOptions
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          return data.articles;
        })
        .then((data) => {
          console.log(Math.floor(data.length / 10));
          let pages =
            data.length % 10 === 0
              ? Math.floor(data.length / 10)
              : Math.floor(data.length / 10) + 1;

          this.setState({
            noOfPages: pages,
          });
        });
    } else {
      console.log("else");

      await fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          return data.articles;
        })
        .then((data) => {
          this.setState({
            articles: data,
          });
        });

      await fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?limit={${this.props.maxArticles}}`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          return data.articles;
        })
        .then((data) => {
          console.log(data.length);
          let pages =
            data.length % 10 === 0
              ? Math.floor(data.length / 10)
              : Math.floor(data.length / 10) + 1;

          this.setState({
            noOfPages: pages,
          });
        });
    }
    await fetch(`https://mighty-oasis-08080.herokuapp.com/api/tags`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        return data.tags;
      })
      .then((data) => {
        this.setState({
          tags: data,
        });
      });
  }

  handleClick = (e) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.userInfo
          ? `Bearer ${this.props.userInfo.token}`
          : null,
      },
    };
    if (e.target.dataset.id === "reset") {
      console.log("if");
      fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10`)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data.articles.length);
          return data.articles;
        })
        .then((data) => {
          this.setState(
            {
              articles: data,
              currentTag: "",
              breadcrumb: "reset",
            },
            () => {
              fetch(
                `https://mighty-oasis-08080.herokuapp.com/api/articles?limit={${this.props.maxArticles}}`
              )
                .then((data) => {
                  return data.json();
                })
                .then((data) => {
                  return data.articles;
                })
                .then((data) => {
                  console.log(Math.floor(data.length / 10));
                  let pages =
                    data.length % 10 === 0
                      ? Math.floor(data.length / 10)
                      : Math.floor(data.length / 10) + 1;

                  this.setState({
                    noOfPages: pages,
                  });
                });
            }
          );
        });
    } else if (e.target.dataset.id === "page") {
      console.log(e.target.innerText);
      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10&&offset=${
          (Number(e.target.innerText) - 1) * 10
        }`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data.articles.length);
          return data.articles;
        })
        .then((data) => {
          this.setState({
            articles: data,
            currentPage: e.target.innerText,
          });
        });
    } else if (e.target.dataset.id === "feed") {
      console.log("success");
      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/feed?limit=10`,
        requestOptions
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data.articles);
          return data.articles;
        })
        .then((data) => {
          this.setState({
            articles: data,
            breadcrumb: "feed",
          });
        });

      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/feed`,
        requestOptions
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          return data.articles;
        })
        .then((data) => {
          console.log(Math.floor(data.length / 10));
          let pages =
            data.length % 10 === 0
              ? Math.floor(data.length / 10)
              : Math.floor(data.length / 10) + 1;

          this.setState({
            noOfPages: pages,
          });
        });
    } else {
      console.log("else");
      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?tag=${e.target.dataset.id}`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data.articles.length);
          return data.articles;
        })
        .then((data) => {
          this.setState({
            articles: data,
            noOfPages:
              data.length % 10 === 0
                ? Math.floor(data.length / 10)
                : Math.floor(data.length / 10) + 1,
            currentTag: e.target.dataset.id,
          });
        });
    }
  };

  getPages = () => {
    let pages = [];
    if (this.state.noOfPages === 1) {
      return null;
    }
    for (let i = 1; i <= this.state.noOfPages; i++) {
      pages.push(
        <li>
          <div
            data-id="page"
            className={
              this.state.currentPage == i
                ? "pagination-link has-background-dark has-text-white"
                : "pagination-link has-background-light"
            }
            onClick={this.handleClick}
          >
            {i}
          </div>
        </li>
      );
    }
    return pages;
  };
  render() {
    return (
      <div className="container">
        <nav class="breadcrumb py-2 mt-4" aria-label="breadcrumbs">
          <ul>
            {this.props.userInfo ? (
              <li>
                <Link
                  className={
                    this.state.breadcrumb === "feed"
                      ? "has-text-success"
                      : "has-text-dark"
                  }
                  to="/dashboard"
                >
                  <span class="icon is-small">
                    <i class="fas fa-book" aria-hidden="true"></i>
                  </span>
                  <span data-id="feed" onClick={this.handleClick}>
                    My Feed
                  </span>
                </Link>
              </li>
            ) : (
              ""
            )}

            {this.props.userInfo ? (
              <li>
                <Link
                  className={
                    this.state.breadcrumb === "reset"
                      ? "has-text-success"
                      : "has-text-dark"
                  }
                  to="/dashboard"
                >
                  <span class="icon is-small">
                    <i class="fas fa-book" aria-hidden="true"></i>
                  </span>
                  <span data-id="reset" onClick={this.handleClick}>
                    Global Feed
                  </span>
                </Link>{" "}
              </li>
            ) : (
              <li>
                <NavLink activeClassName="has-text-success" to={`/articles`}>
                  <span class="icon is-small">
                    <i class="fas fa-book" aria-hidden="true"></i>
                  </span>
                  <span data-id="reset" onClick={this.handleClick}>
                    Global Feed
                  </span>
                </NavLink>
              </li>
            )}
            {this.state.currentTag ? (
              <li>
                <div className="ml-4 has-text-info-dark">
                  <span>#{this.state.currentTag}</span>
                </div>
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>

        {this.state.articles ? (
          <div className="columns container mx-1">
            <div className="p-2 column is-8  ">
              {this.state.articles.length === 0 ? (
                <div className="sub-title has-text-danger">
                  No articles found :(
                </div>
              ) : (
                ""
              )}
              {this.state.articles.map((article) => {
                return (
                  <div
                    key={article.slug}
                    className="box  px-4 mb-6 has-background-light"
                  >
                    <div className="is-size-4 has-text-dark has-text-weight-bold py-5">
                      {article.title}
                    </div>
                    <div class="field  is-grouped is-grouped-multiline">
                      <div class="control  article-tag">
                        <div class="tags  p-0 m-0 has-addons">
                          <span class="tag is-dark">
                            {article.createdAt.split("T")[0]}
                          </span>
                          <Link
                            to={`/profiles/${article.author.username}`}
                            class="tag is-danger"
                          >
                            {article.author.username}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link to={`/articles/${article.slug}`}>
                      {" "}
                      <div className="button read-more is-small is-dark">
                        Read More
                      </div>
                      
                    </Link>
                    <div className="hearts">
                       
                        <span className="">
                          <i className="fas fa-heart"></i>
                        </span>
                        <span className="is-size-6 has-text-weight-bold mx-1">
                          {" "}
                          {article.favoritesCount}
                        </span>
                      </div>
                  </div>
                );
              })}

              <nav
                class="pagination is-centered my-6"
                role="navigation"
                aria-label="pagination"
              >
                <ul class="pagination-list">{this.getPages()}</ul>
              </nav>
            </div>{" "}
            <div className="column pl-6 pt-2 is-4">
              <div className=" tag-box box  has-background-light">
                {this.state.tags ? (
                  <div className="tags">
                    {this.state.tags.map((tag) => {
                      return (
                        <div
                          key={tag}
                          className={
                            this.state.currentTag === tag
                              ? "tag is-danger"
                              : "tag is-dark"
                          }
                          data-id={tag}
                          onClick={this.handleClick}
                        >
                          {" "}
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  "Loading..."
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="articles-loading"> "Loading..."</div>
        )}
      </div>
    );
  }
}

export default Feed;
