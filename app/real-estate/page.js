
import Head from 'next/head'
import ActiveFilters from './components/ActiveFilters';
import FilterSidebar from './components/FilterSidebar';
import PropertyCatalog from './components/PropertyCatalog';


const page = () => {
  return (
    <div className='catalog-container'>
         <PropertyCatalog/>
    </div>
  );
}

export default page