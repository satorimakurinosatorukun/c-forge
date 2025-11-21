export const curriculum = [
  {
    id: "1-1",
    title: "Phase 1: メモリと変数の実体",
    description: "C言語では、変数は「箱」であると同時に「メモリ上の住所（アドレス）」を持ちます。&演算子を使ってアドレスを確認しましょう。",
    initialCode: `#include <stdio.h>

int main() {
    // 整数型の変数を宣言
    int value = 42;
    
    // 変数のアドレスを表示 (&value)
    printf("Value: %d\\n", value);
    printf("Address: %p\\n", &value);
    
    return 0;
}`,
    // シミュレータ用の期待されるメモリ状態定義
    simulationConfig: {
      stack: [
        { address: "0x7ffc001", name: "value", type: "int", value: "42", hexValue: "0x0000002A" }
      ],
      heap: [],
      output: "Value: 42\nAddress: 0x7ffc001"
    }
  },
  {
    id: "1-2",
    title: "Phase 1: ポインタ変数の宣言",
    description: "ポインタは「他の変数のアドレス」を格納するための変数です。これにより間接的なアクセスが可能になります。",
    initialCode: `#include <stdio.h>

int main() {
    int target = 100;
    // ポインタ変数の宣言（targetのアドレスを格納）
    int *ptr = &target;
    
    printf("Target Value: %d\\n", target);
    printf("Pointer Value (Address): %p\\n", ptr);
    printf("Dereferenced: %d\\n", *ptr);
    
    return 0;
}`,
    simulationConfig: {
      stack: [
        { address: "0x7ffc004", name: "target", type: "int", value: "100", hexValue: "0x00000064" },
        { address: "0x7ffc008", name: "ptr", type: "int*", value: "0x7ffc004", hexValue: "0x7FFC004", isPointer: true, pointsTo: "0x7ffc004" }
      ],
      heap: [],
      output: "Target Value: 100\nPointer Value (Address): 0x7ffc004\nDereferenced: 100"
    }
  },
  {
    id: "2-1",
    title: "Phase 2: スタック vs ヒープ (malloc)",
    description: "malloc関数を使うと、関数のスコープを超えて生存する「ヒープ領域」にメモリを確保できます。使い終わったらfreeが必要です。",
    initialCode: `#include <stdlib.h>
#include <stdio.h>

int main() {
    // スタック上のポインタ
    int *heapPtr;
    
    // ヒープ領域にメモリを確保 (4バイト)
    heapPtr = (int*)malloc(sizeof(int));
    
    *heapPtr = 999;
    
    printf("Heap Value: %d\\n", *heapPtr);
    
    // メモリ解放（これを忘れるとリーク！）
    free(heapPtr);
    
    return 0;
}`,
    simulationConfig: {
      stack: [
        { address: "0x7ffc010", name: "heapPtr", type: "int*", value: "0x5000001", isPointer: true, pointsTo: "0x5000001" }
      ],
      heap: [
        { address: "0x5000001", type: "int", value: "999", isAllocated: true }
      ],
      output: "Heap Value: 999\nProcess finished with exit code 0"
    }
  }
];
