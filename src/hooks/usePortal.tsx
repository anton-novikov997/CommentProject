import { useRef, useEffect } from 'react';

function createRootElement(id: string) {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

function addRootElement(rootElem: Element) {
  const lastElementChild = document.body.lastElementChild;
  if (lastElementChild) {
    document.body.insertBefore(rootElem, lastElementChild.nextElementSibling);
  } else {
    document.body.appendChild(rootElem);
  }
}

export function usePortal(id: string) {
  const rootElemRef = useRef<Element | null>(null);
  useEffect(
    function setupElement() {
      const existingParent = document.querySelector(`#${id}`);
      const parentElem = existingParent || createRootElement(id);
      if (!existingParent) {
        addRootElement(parentElem);
      }
      if (rootElemRef.current) {
        parentElem.appendChild(rootElemRef.current);
      }
      return function removeElement() {
        if (rootElemRef.current) {
          rootElemRef.current.remove();
        }
        if (!parentElem.childElementCount) {
          parentElem.remove();
        }
      };
    },
    [id],
  );

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  }

  return getRootElem();
}
