import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";

// * NOTE: storage 이벤트 외에 'storage-inner-document' 이벤트를 추가한 이유
// * storage 이벤트는 동일한 document(브라우저 탭)에서 발생한 local storage 변경에는 실행이 되지 않습니다.
// * 따라서 useLocalStorage 내부에서 값을 수정할 때 storage-inner-document 이벤트를 수정해서 브라우저 탭 내부에서도 local storage 변경을 감지할 수 있도록 코드를 작성했습니다.
interface StorageEventInnerDocumentDetail {
  key: string;
  oldValue: string | null;
  newValue: string | null;
}

class StorageEventInnerDocument extends CustomEvent<StorageEventInnerDocumentDetail> {
  static eventName = "storage-inner-document";
  constructor(key: string, oldValue: string | null, newValue: string | null) {
    super(StorageEventInnerDocument.eventName, {
      detail: { key, oldValue, newValue },
    });
  }
}

const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const localStorageSubscriber = (listener: () => void) => {
  window.addEventListener("storage", listener);
  window.addEventListener(StorageEventInnerDocument.eventName, listener);

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(StorageEventInnerDocument.eventName, listener);
  };
};

export function useLocalStorage(
  key: string
): readonly [string | null, (value: string) => void];
export function useLocalStorage(
  key: string,
  initialValue?: string
): readonly [string, (value: string) => void];
export function useLocalStorage(key: string, initialValue?: string) {
  const value = useSyncExternalStore(localStorageSubscriber, () => {
    return getLocalStorageItem(key) ?? initialValue ?? null;
  });

  const setValue = useCallback(
    (setStateAction: SetStateAction<string>) => {
      const newValue =
        typeof setStateAction === "function"
          ? setStateAction(getLocalStorageItem(key)!)
          : setStateAction;
      setLocalStorageItem(key, newValue);
      window.dispatchEvent(new StorageEventInnerDocument(key, value, newValue));
    },
    [key, value]
  );

  return [
    value as typeof initialValue extends undefined ? string | null : string,
    setValue,
  ] as const;
}

export function useLocalStorageObject<ObjectType extends object>(
  key: string
): readonly [
  ObjectType,
  ObjectType | ((value: ObjectType | null) => ObjectType)
];
export function useLocalStorageObject<ObjectType extends object>(
  key: string,
  initialValue: ObjectType
): readonly [ObjectType, Dispatch<SetStateAction<ObjectType>>];
export function useLocalStorageObject<ObjectType extends object>(
  key: string,
  initialValue?: ObjectType
) {
  const [jsonString, setJsonString] = useLocalStorage(
    key,
    initialValue ? JSON.stringify(initialValue) : undefined
  );

  const value = useMemo(
    () => JSON.parse(jsonString ?? "null") as ObjectType | null,
    [jsonString]
  );
  const setValue = useCallback(
    (
      setStateAction: ObjectType | ((value: ObjectType | null) => ObjectType)
    ) => {
      const newValue =
        typeof setStateAction === "function"
          ? setStateAction(
              JSON.parse(getLocalStorageItem(key) ?? "null") ?? initialValue
            )
          : setStateAction;

      setJsonString(JSON.stringify(newValue));
    },
    [key, initialValue, setJsonString]
  );

  return [value, setValue] as const;
}
