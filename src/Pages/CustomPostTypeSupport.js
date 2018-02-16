import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 as style } from 'react-syntax-highlighter/styles/hljs';

const REGISTER_POST_TYPE = `register_post_type( 'book', [
  'label' => __( 'Books', 'wcphx' ),
  'supports' => [ 'title', 'editor', 'custom-fields' ],
  'public' => true,
  'show_in_graphql' => true,
  'graphql_single_name' => 'book',
  'graphql_plural_name' => 'books',
] );
`;

const REGISTER_TAXONOMY = `register_taxonomy( 'genre', 'book', [
  'label' => __( 'Genre', 'wcphx' ),
  'public' => true,
  'show_in_graphql' => true,
  'graphql_single_name' => 'genre',
  'graphql_plural_name' => 'genres',
  'hierarchical' => true,
]);
`;

const CUSTOM_FIELD = `add_filter( 'graphql_book_fields', function( $fields ) {
  $fields['price'] = [
    'type' => WPGraphQL\Types::string(),
    'resolve' => function( \WP_Post $post ) {
      return get_post_meta(  $post->ID, 'price', true );
    }
  ];
  return $fields;
} );
`;


class CustomPostTypeSupport extends Component {
  render() {
    return(
      <div>
        <h2>Register Post Type</h2>
        <SyntaxHighlighter
          language='php'
          style={style}
          showLineNumbers
        >
          {REGISTER_POST_TYPE}
        </SyntaxHighlighter>

        <h2>Register Taxonomy</h2>
        <SyntaxHighlighter
          language='php'
          style={style}
          showLineNumbers
        >
          {REGISTER_TAXONOMY}
        </SyntaxHighlighter>

        <h2>Expose Custom Field</h2>
        <SyntaxHighlighter
          language='php'
          style={style}
          showLineNumbers
        >
          {CUSTOM_FIELD}
        </SyntaxHighlighter>
      </div>
    )
  }
}

export default CustomPostTypeSupport