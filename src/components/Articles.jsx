import React, { Component } from "react";
import { Switch, Route, Link, NavLink } from "react-router-dom";
class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      noOfPages: 1,
      currentTag: null,
    };
  }

  async componentDidMount() {
  await fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?limit=5`)
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
    if(e.target.dataset.ready==='reset'){
     console.log("if")
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles`)
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
            currentTag:null,
            noOfPages:
              data.length % 10 === 0
                ? Math.floor(data.length / 10)
                : Math.floor(data.length / 10) + 1,
          });
        });
   
     
    } else{
     console.log("else")
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
  }};

  getPages = () => {
    let pages = [];
    if(this.state.noOfPages===1){
      return null
    }
    for (let i = 0; i < this.state.noOfPages; i++) {
      pages.push(
        <li>
          <NavLink
            to="/articles"
            className="pagination-link"
            activeClassName="pagination-link is-current has-background-dark"
            aria-label="Goto page 1"
          >
            {i + 1}
          </NavLink>
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
              <Link className="has-text-success" to={`/articles`} >
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                <span data-ready='reset' onClick={this.handleClick}>Global Feed</span>
              </Link>
            </li>
            {this.state.currentTag ? (
              <li>
                <Link className="has-text-success" to={`/articles/tags/${this.state.currentTag}`}>
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
                  <div className="box  px-4 mb-6 has-background-light">
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
                        <NavLink
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
