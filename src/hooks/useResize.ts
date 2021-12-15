import { useEffect } from 'react';

function useResize(onResize: () => void) {
  useEffect(() => {
    window.addEventListener('resize', onResize);

    return function cleanUp() {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);
}

export default useResize;
