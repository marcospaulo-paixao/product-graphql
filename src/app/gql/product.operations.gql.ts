import { gql } from 'apollo-angular'

export const PRODUCT_FIND_ALL = gql`query {
  product (order_by: {pro_name: asc}) {
    pro_id
    pro_name
    pro_price  
    category {
      cat_id
      cat_name
    }
  }
}`;

export const PRODUCT_FIND_PAGED = gql`query ($limit: Int!, $offset: Int!) {
  product_aggregate {
    aggregate {
      totalCount: count
    }
  }
  product (limit: $limit, offset: $offset,order_by: {pro_name: asc}){
    pro_id
    pro_name
    pro_price
    category {
      cat_id
      cat_name
    }
  }
}
`;

export const PRODUCT_FIND_BY_NAME_PAGED = gql`query ($limit: Int!, $offset: Int!, $name: String)  {
  product_aggregate(where: {pro_name: {_ilike: $name}}) {
    aggregate {
      totalCount: count
    }
  }
  product (limit: $limit, offset: $offset,where: {pro_name: {_ilike: $name}}, order_by: {pro_name: asc}){
    pro_id
    pro_name
    pro_price
    category {
      cat_id
      cat_name
    }
  }
}`;


export const PRODUCT_FIND_BY_ID = gql`query ($id: Int!) {
  product (where: {pro_id: {_eq: $id}}) {
    pro_id
    pro_name
    pro_price
    category {
      cat_id
      cat_name
    }
  }
}`;

export const PRODUCT_SAVE = gql`mutation ($pro_name: String, $pro_price: Float!, $cat_id: Int!) {
  insert_product_one(object: {pro_cat_id:  $cat_id, pro_name: $pro_name, pro_price: $pro_price}, on_conflict: {constraint: product_pkey, update_columns: pro_cat_id}) {
    pro_id
    pro_name
    pro_price
    category {
      cat_id
      cat_name
    }
  }
}`;

export const PRODUCT_UPDATE = gql`mutation ($pro_id: Int!,$pro_name: String, $pro_price: Float,$cat_id: Int!) {
  update_product_by_pk(pk_columns: {pro_id: $pro_id}
    _set: {
      pro_name: $pro_name,
			pro_price: $pro_price,
      pro_cat_id: $cat_id
    }){
    pro_id
    pro_name
    pro_price
    category{
      cat_id
      cat_name
    }
  }
}`;

export const PRODUCT_DELETE = gql`mutation ($pro_id: Int!) {
  delete_product_by_pk(pro_id: $pro_id) {
    pro_id
    pro_name
    pro_price
    category {
      cat_id
      cat_name
    }
  }
}`;