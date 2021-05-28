import { gql } from 'apollo-angular'

export const CATEGORY_FIND_ALL = gql`query  {
    category (order_by: {cat_name: asc}){
      cat_id
      cat_name
    }
}`;

export const CATEGORY_FIND_PAGED = gql`query ($limit: Int!, $offset: Int!){
    category_aggregate{
      aggregate{
              totalCount: count
      }
    }category (limit: $limit, offset: $offset, order_by: {cat_name: asc}){
      cat_id
      cat_name
    }
}`;

export const CATEGORY_FIND_BY_NAME_PAGED = gql`query ($limit: Int!, $offset: Int!, $name: String) {
  category_aggregate(where: {cat_name: {_ilike: $name}}) {
    aggregate {
      totalCount: count
    }
  }
  category(limit: $limit, offset: $offset, where: {cat_name: {_ilike: $name}}, order_by: {cat_name: asc}) {
    cat_id
    cat_name
  }
}`;


export const CATEGORY_FIND_BY_ID = gql`query ($id: Int!) {
    category(where: {cat_id: {_eq: $id}}) {
      cat_id
      cat_name
    }
}`;

export const CATEGORY_SAVE = gql`mutation ($name: String) {
    insert_category_one(object: {cat_name: $name}) {
      cat_id
      cat_name
    }
}`;

export const CATEGORY_UPDATE = gql`mutation ($id: Int!, $name: String) {
    update_category_by_pk(
      pk_columns: {cat_id: $id}
        _set: {cat_name: $name}) {
        cat_id
      cat_name
    }
}`;

export const CATEGORY_DELETE = gql`mutation ($id: Int!) {
    delete_category_by_pk(cat_id: $id){
      cat_id
      cat_name
    }
}`;