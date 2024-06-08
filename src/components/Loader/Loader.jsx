import { FallingLines } from 'react-loader-spinner';

function Loader({ isLoading }) {
  return (
    <>
      <FallingLines visible={isLoading} color="#FFA500" />
    </>
  );
}

export default Loader;
