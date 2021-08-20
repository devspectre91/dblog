import React, { Component } from "react";
import UserContext from "./UserContext";



class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      tagList: null,
      description: null,
      body: null,
      title: null,
    };
  }
  static contextType = UserContext
  componentDidMount() {
    const userInfo = this.context
    if (!userInfo) {
      this.props.history.push("/");
    } else {
      this.setState(
        {
          status: "loading",
        },
        () => {
          fetch(
            `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}`
          )
            .then((data) => {
              return data.json();
            })
            .then((data) => {
              console.log(data.article);
              this.setState({
                tagList: data.article.tagList.join(),
                description: data.article.description,
                body: data.article.body,
                title: data.article.title,
                status: null,
              });
            });
        }
      );
    }
  }

  handleChange = (e) => {
    if (e.target.name === "title") {
      this.setState({
        title: e.target.value,
      });
    } else if (e.target.name === "body") {
      this.setState({
        body: e.target.value,
      });
    } else if (e.target.name === "description") {
      this.setState({
        description: e.target.value,
      });
    } else if (e.target.name === "tagList") {
      this.setState({
        tagList: e.target.value,
      });
    }
  };

  handleClick = () => {
    const userInfo = this.context
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        article: {
          title: this.state.title,
          body: this.state.body,
          description: this.state.description,
          tagList: this.state.tagList.split(","),
        },
      }),
    };

    this.setState(
      {
        status: "loading",
      },
      () => {
        fetch(
          `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}`,
          requestOptions
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res);
            if (res.article) {
              this.props.history.push(`/articles/${res.article.slug}`);
            }
          });
      }
    );
  };

  render() {
    return (
      <>
        <div className="columns is-centered py-0">
          {/* checking if the status id loading or not */}
          {this.state.status === "loading" ? (
           <div className="lds-ellipsis "><div></div><div></div><div></div><div></div></div>
          ) : (
            <div className="box m-6 py-5 pb-6 px-4 column is-three-fifths has-background-light">
              <div className="title has-text-centered my-3 mb-4">
                Edit Article
              </div>

              <div class="field">
                <p class="control ">
                  <input
                    class="input p-3"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="Title"
                  />
                </p>
              </div>
              <div class="field">
                <p class="control ">
                  <input
                    class="input p-3"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </p>
              </div>
              <div class="field">
                <p class="control ">
                  <textarea
                    class="textarea p-3"
                    name="body"
                    placeholder="Article's Body"
                    value={this.state.body}
                    onChange={this.handleChange}
                  />
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <input
                    class="input p-3"
                    type="text"
                    placeholder="Tag List (comma separated) e.g. css, html, javascript"
                    name="tagList"
                    value={this.state.tagList}
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
                  >
                    Update Article
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default EditArticle;
