"use client";

import { useState } from 'react';

const perguntas = [
  "些細な日常の状況でも、自分の怒りをコントロールするのが難しい。",
  "すぐに我慢ができなくなり、家族や知らない人に怒りをぶつけてしまう。",
  "後悔するほど激しい怒りを感じ、怒りに任せて言った言葉や取った行動を後悔することがある。",
  "誰かにイライラさせられたり、がっかりさせられたりすると許すのが難しく、恨みを持ち続ける。",
  "怒りを感じると、動悸や筋肉の緊張、呼吸が速くなるなど、身体的に強く反応する。",
  "最近、怒りが激しすぎて、自分自身や他人に身体的な危害を加えたいと思ったことがある。", // FLAG
  "頻繁な苛立ちが原因で、家族や職場、社会的な人間関係が悪化している。",
  "自分の怒りが時間と共に増していき、改善やコントロールが難しくなっていると感じる。",
  "平穏に解決したいと思っていても、つい攻撃的または敵対的な態度を取ってしまう。",
  "怒りを感じて行動した後、その行動に後悔や恥ずかしさを頻繁に感じる。"
];

export default function TesteRaiva() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("赤");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("緑");
      else if (soma <= 35) setResultado("黄");
      else setResultado("赤");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">怒りのテスト</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">質問 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">結果: {resultado}</h2>
          {resultado === "緑" && <p>あなたはこの問題に非常によく対処できており、感情的にも安定しています。他の人を支援することも可能です。</p>}
          {resultado === "黄" && <p>取り組むべき感情的問題の兆候がありますが、決意と支援があれば克服可能です。</p>}
          {resultado === "赤" && <p>この問題に関するあなたの感情的な問題は専門家の助けが必須です。早急に医師や心理士の支援を受けてください。</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            テストをやり直す
          </button>
        </>
      )}
    </div>
  );
}
