import { RotatingSquare } from 'react-loader-spinner';
import { useLoaderContext } from '../../context/LoaderContext';

export default function Loader(): JSX.Element {
  const { showLoader } = useLoaderContext()
  return (
    <>
    { showLoader && <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
      }}
    >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000, 
          }}
        >
          <RotatingSquare
            visible={true}
            height={150}
            width={150}
            color="#007A80"
            ariaLabel="rotating-square-loading"
          />
        </div>
      </div> }
    </>
  );
}
