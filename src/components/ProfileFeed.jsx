import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class ProfileFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      breadcrumb:'published',
      user:null
    };
  }

  async componentDidMount() {
  
 
      await fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/?author=${this.props.user.username}`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data.articles.length);
          return data.articles;
        })
        .then((data) => {
          let pages =
            data.length % 10 === 0
              ? Math.floor(data.length / 10)
              : Math.floor(data.length / 10) + 1;
          this.setState({
            articles: data,
            noOfPages: pages
            
          });
        });

 
    
  
  }

  handleClick = (e) => {
   console.log(e.target)
    if (e.target.dataset.id === "published") {
      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/?author=${this.props.user.username}`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data.articles.length);
          return data.articles;
        })
        .then((data) => {
          let pages =
            data.length % 10 === 0
              ? Math.floor(data.length / 10)
              : Math.floor(data.length / 10) + 1;
          this.setState({
            articles: data,
            noOfPages: pages,
            breadcrumb:'published'
            
          });
        });
    } else if (e.target.dataset.id === "favorited") {
     
      fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/?favorited=${this.props.user.username}`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data.articles.length);
          return data.articles;
        })
        .then((data) => {
          let pages =
            data.length % 10 === 0
              ? Math.floor(data.length / 10)
              : Math.floor(data.length / 10) + 1;
          this.setState({
            articles: data,
            noOfPages: pages,
            breadcrumb:'favorited'
            
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
                <div className={this.state.breadcrumb==='published'?'has-text-success mx-3 pointer-link':'has-text-dark mx-3 pointer-link'} >
                  <span class="icon is-small">
                    <i class="fas fa-book" aria-hidden="true"></i>
                  </span>
                  <span data-id="published" onClick={this.handleClick} >Published</span>
                </div>
              </li>
          

        
              <li>
                <div className={this.state.breadcrumb==='favorited'?'has-text-success mx-3 pointer-link':'has-text-dark mx-3 pointer-link'} >
                  <span class="icon is-small">
                    <i class="fas fa-book" aria-hidden="true"></i>
                  </span>
                  <span data-id="favorited" onClick={this.handleClick}>
                    Favourited
                  </span>
                </div>
              </li>
          
             
            
     
          </ul>
        </nav>

        {this.state.articles ? (
          <div className="columns container mx-1">
            <div className="p-2 column is-full  ">
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
                          <Link to={`/profiles/${article.author.username}`} class="tag is-danger">
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
                  </div>
                );
              })}

              {/* <nav
                class="pagination is-centered my-6"
                role="navigation"
                aria-label="pagination"
              >
                <ul class="pagination-list">{this.getPages()}</ul>
              </nav> */}
            </div>{" "}
          
          </div>
        ) : (
          <div className="articles-loading"> "Loading..."</div>
        )}
      </div>
    );
  }
}

export default ProfileFeed;
