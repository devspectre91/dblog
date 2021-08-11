import React, { Component } from "react";
import {Link, NavLink } from "react-router-dom";
class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      noOfPages: 1,
      currentTag: null,
      tags: null,
      currentPage: 1,
    };
  }

  async componentDidMount() {
    await fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10`
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

    await fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles`)
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
            },
            () => {
              fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles`)
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
            <li>
              <Link className="has-text-success" to={`/articles`}>
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                <span data-id="reset" onClick={this.handleClick}>
                  Global Feed
                </span>
              </Link>
            </li>
            {this.state.currentTag ? (
              <li>
                <Link
                  className="has-text-success"
                  to={`/articles/tags/${this.state.currentTag}`}
                >
                  <span>#{this.state.currentTag}</span>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>

        {this.state.articles ? (
          <div className="columns container mx-1">
            <div className="p-2 column is-8  ">
              {this.state.articles.map((article) => {
                return (
                  <div key={article.slug} className="box  px-4 mb-6 has-background-light">
                    <div className="is-size-4 has-text-dark has-text-weight-bold py-5">
                      {article.title}
                    </div>
                    <div class="field  is-grouped is-grouped-multiline">
                      <div class="control  article-tag">
                        <div class="tags  p-0 m-0 has-addons">
                          <span class="tag is-dark">
                            {article.createdAt.split("T")[0]}
                          </span>
                          <span class="tag is-danger">
                            {article.author.username}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/articles/${article.slug}`}>
                      {" "}
                      <div className="button read-more is-small is-dark">
                        Read More
                      </div>
                    </Link>
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
                        <NavLink key={tag}
                          className="tag is-dark"
                          data-id={tag}
                          activeClassName="tag is-danger"
                          to={`/articles/tags/${tag}`}
                          onClick={this.handleClick}
                        >
                          {" "}
                          {tag}
                        </NavLink>
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

export default Articles;
