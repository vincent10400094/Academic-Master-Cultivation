'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount() {
        $.ajax({
            url: 'api/search?keyword=' + this.props.location.query.keyword,
            method: 'GET'
        }).done((data) => {
            console.log('search data:', data);
            document.title = data.keyword;
            this.setState({ posts: data.posts, keyword: data.keyword });
        }).fail((jqXhr) => {
            console.log(jqXhr);
        });
    }

    render() {
        let searchResult = this.state.posts.map((post, index) => {
            return (
                <div className='well'>
                    <h3><Link to={`/u/${post.name}/${post.time.day}/${post.title}`}>{post.title}</Link></h3>
                    <p className='grey'>{post.time.date} - {post.name}</p>
                </div>
            );
        });

        if(!searchResult.length){
            searchResult.push(
                <div className='well'>
                    <h3>No results match "{this.state.keyword}"</h3>
                </div>
            );
        }

        console.log('search result', searchResult)

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            {searchResult}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}