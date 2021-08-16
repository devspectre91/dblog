import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      taglist: [],
      description: null,
      body: null,
      title: null,
    };
  }

  componentDidMount() {
    if (!this.props.userInfo) {
      this.props.history.push("/");
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
    } else if (e.target.name === "taglist") {
      this.setState({
        taglist: e.target.value,
      });
    }
  };

  handleClick = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.userInfo.token}`,
      },
      body: JSON.stringify({
        article: {
          title: this.state.title,
          body: this.state.body,
          description: this.state.description,
          tagList: this.state.taglist.split(","),
        },
      }),
    };

    this.setState(
      {
        status: "loading",
      },
      () => {
        fetch(
          "https://mighty-oasis-08080.herokuapp.com/api/articles",
          requestOptions
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res.article);
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
            <div className=" py-5 pb-6 px-4 column articles-loading is-half is-size-2 has-text-centered has-text-info-dark">
              {" "}
              "Publishing your Article..."
            </div>
          ) : (
            <div className="box m-6 py-5 pb-6 px-4 column is-three-fifths has-background-light">
              <div className="title has-text-centered my-3 mb-4">
                Create Article
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
                    name="taglist"
                    value={this.state.taglist}
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
                    Publish
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

export default withRouter(CreateArticle);
