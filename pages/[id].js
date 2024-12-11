import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';

// define a getStaticProps() function to have next.js retrieve data to use for the dynamic page
export async function getStaticProps( { params } ) {
  // const itemData = await getData(params.id);
  const itemData = await getData(params.id);
  return {
    props: {
      itemData
    }
  };
}

// define a getStaticPaths() function to tell next.js all valid URLs
export async function getStaticPaths() {
  // const paths = getAllIds();
  const paths = await getAllIds();
  return {
    paths,
    fallback: false
  };
}

// export our dynamically routed page component Entry
export default function Entry( { itemData } ) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h4 className="card-title">{itemData.ID}</h4>
          <h5 className="card-title">{itemData.post_title}</h5>
        </div>
      </article>
    </Layout>
  );
}

/* <a href="#" className="card-link">{itemData.email}</a>
<h6 className="card-subtitle mb-2 mt-1 text-body-secondary">{itemData.phone}</h6>
<p className="card-text">Birthday: {itemData.birthdate}</p>
<p className="card-text">Hi, my name is {itemData.name}.</p>
<p className="card-text">I went to {itemData.school}, and am now a {itemData.profession}.</p>
<p className="card-text">My favorite way to relax is {itemData.hobby}</p> */