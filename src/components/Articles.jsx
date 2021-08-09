import React, { Component } from "react";
import { Switch, Route, Link, NavLink } from "react-router-dom";
class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      noOfPages:1
    };
  }

  componentDidMount() {
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
          noOfPages:(data.length%10===0)?Math.floor(data.length / 10):Math.floor(data.length / 10)+1
        });
      });
  }

  getPages= ()=>{
       let pages =[];
       for(let i=0; i<this.state.noOfPages; i++){
           pages.push(
            <li><NavLink to='/articles' className="pagination-link" activeClassName="pagination-link is-current has-background-dark" aria-label="Goto page 1">{i+1}</NavLink></li>)
       }
       return pages;
  }
  render() {
    return (
      <>
        <nav class="breadcrumb py-2 mt-4" aria-label="breadcrumbs">
          <ul>
            <li>
              <NavLink
                activeClassName="has-text-dark"
                className="has-text-black"
                to="/articles"
                exact
              >
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                <span>Global Feed</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {this.state.articles ? (
          <div className="p-2 container ">
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
                  <div className="button read-more is-small is-dark">
                      Read More</div>                </div>
              );
            })}

<nav class="pagination is-centered my-6" role="navigation" aria-label="pagination">

<ul class="pagination-list">

{
    this.getPages()
}

</ul>
</nav>
  
          </div>
        ) : (
          "Loading..."
        )}
      </>
    );
  }
}

export default Articles;
