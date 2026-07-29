import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import { G, Path, Svg, Image as SvgImage } from "react-native-svg";
// 위치 선택 맵 구역 좌표
export const CAMPUS_ZONES = [
  {
    id: 1,
    name: "1호관(본관)",
    d: "M694.5 276.5L754 279.5V271.5L759 262H802.5L809.5 268V279.5H870.5L876 304.5L872.5 334.5L692 331.5L687.5 302.5L694.5 276.5Z",
  },
  {
    id: 2,
    name: "2호관",
    d: "M704.5 139L711.5 122.5H769.5V114L853 115.5L851 154.5H841V160L782.5 157.5L781 169.5H729.5L728 179.5H702V170.5L704.5 162.5V139Z",
  },
  {
    id: 3,
    name: "60주년기념관",
    d: "M633 257L627.5 233L636.5 210.5L640.5 139L642.5 129L660 87.5H668.5L671.5 89.5V98H681L690 73L695.5 68H710L713.5 73L710 113L688 230.5H676.5L668.5 257H633Z",
  },
  {
    id: 4,
    name: "4호관",
    d: "",
  },
  {
    id: 5,
    name: "5호관",
    d: "M358.5 212.5L432.5 117H611L615 107.5L623 101.5H633L640.5 107.5L643.5 132.5L640.5 138.5V174L615 250L372.5 242.5L358.5 212.5Z",
  },
  {
    id: 6,
    name: "6호관",
    d: "",
  },
  {
    id: 7,
    name: "7호관(학생회관)",
    d: "",
  },
  {
    id: 8,
    name: "정석학술정보관",
    d: "",
  },
  {
    id: 9,
    name: "9호관",
    d: "",
  },
  {
    id: 10,
    name: "서호관",
    d: "M224 212.5L241.5 192L281 194L285 190.5H294.5L300 194H308.5V186.5H334L341.5 178.5H372L377.5 189L358 212.5L366.5 230L360 239.5H350.5L344.5 248.5L300 247L293.5 237L236.5 234L224 212.5Z",
  },
  {
    id: 11,
    name: "나빌레관",
    d: "M170 214.5L178 207L220 209.5L230 228L212.5 253L195.5 251.5L191 239.5L172.5 258.5L154 256L147 242L156 232H125V214.5H170Z",
  },
  {
    id: 12,
    name: "하이테크센터",
    d: "M911 132.5L908.5 106L911 74H977.5V66H1013V74H1041L1056.5 20H1101L1120.5 46.5L1077 155.5H1041L1037 148H1029L1023 132.5H949.5V135.5H932L930.5 132.5H911Z",
  },
  {
    id: 13,
    name: "로스쿨관",
    d: "",
  },
  {
    id: 14,
    name: "학군단",
    d: "",
  },
  {
    id: 15,
    name: "평생교육관/미래융합대학",
    d: "",
  },
  {
    id: 16,
    name: "김현태 인하드림센터",
    d: "",
  },
  {
    id: 17,
    name: "체육관",
    d: "",
  },
  {
    id: 18,
    name: "인하드림센터 2,3관",
    d: "",
  },
  {
    id: 19,
    name: "대운동장",
    d: "",
  },
  {
    id: 20,
    name: "농구장",
    d: "",
  },
  {
    id: 21,
    name: "테니스장",
    d: "",
  },
  {
    id: 22,
    name: "C호관",
    d: "",
  },
  {
    id: 23,
    name: "비룡주차장",
    d: "",
  },
  {
    id: 24,
    name: "제1생활관",
    d: "M894 753L923 726L1107 736.5L1133.5 883.5L1117.5 906H946.5L896 883.5L894 753Z",
  },
  {
    id: 25,
    name: "제2,3생활관",
    d: "",
  },
];
// map 이미지
const MAP_IMAGE = require("../assets/inhaMap.png");
// 원본 PNG의 실제 크기(px)
const ORIGINAL_WIDTH = 1520;
const ORIGINAL_HEIGHT = 918;

const FIXED_SCALE = 2;
const vbW = ORIGINAL_WIDTH / FIXED_SCALE;
const vbH = ORIGINAL_HEIGHT / FIXED_SCALE;

const SPEED = 3; // 원하는 배율 (1 = 기본속도, 2 = 두배 빠름)

const LocationViewBox = ({ selected, setSelected }) => {
  // viewBox 좌상단을 React state로
  const [vb, setVb] = React.useState({ x: 0, y: 0 });

  // 제스처 시작점(SharedValue는 계산용으로만)
  const startVbX = useSharedValue(0);
  const startVbY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      startVbX.value = vb.x;
      startVbY.value = vb.y;
    })
    .onUpdate((e) => {
      const dx = (e.translationX / FIXED_SCALE) * SPEED;
      const dy = (e.translationY / FIXED_SCALE) * SPEED;

      const minX = 0;
      const minY = 0;
      const maxX = ORIGINAL_WIDTH - vbW;
      const maxY = ORIGINAL_HEIGHT - vbH;

      const nx = Math.max(minX, Math.min(maxX, startVbX.value - dx));
      const ny = Math.max(minY, Math.min(maxY, startVbY.value - dy));

      // JS 상태로 반영 (여기가 핵심)
      runOnJS(setVb)({ x: nx, y: ny });
    });

  const handlePress = (z) => {
    setSelected(z.id === selected?.id ? null : z);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <Svg
            // 고정 2배 확대: vbW/vbH로 구현
            viewBox={`${vb.x} ${vb.y} ${vbW} ${vbH}`}
            width="100%"
            style={{ aspectRatio: ORIGINAL_WIDTH / ORIGINAL_HEIGHT }}
          >
            <SvgImage
              href={MAP_IMAGE}
              x="0"
              y="0"
              width={ORIGINAL_WIDTH}
              height={ORIGINAL_HEIGHT}
              preserveAspectRatio="xMidYMid meet"
            />
            {CAMPUS_ZONES.map((z) =>
              z.d ? (
                <G key={z.id} onPress={() => handlePress(z)}>
                  <Path
                    d={z.d}
                    fill={
                      z.id === selected?.id
                        ? "rgba(33,143,202,0.5)"
                        : "rgba(33,143,202,0.01)"
                    }
                    stroke="#218FCA"
                    strokeWidth={z.id === selected?.id ? 2 : 0}
                    vectorEffect="non-scaling-stroke"
                  />
                </G>
              ) : null
            )}
          </Svg>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default LocationViewBox;

const styles = StyleSheet.create({
  locationSelectMask: {
    width: 380,
    height: 230,
    marginVertical: 15,
  },
  locationMapImg: {
    width: "100%",
    height: "100%",
  },
  container: { paddingTop: 18, paddingHorizontal: 5, alignItems: "center" },
  title: { marginBottom: 12, fontSize: 16, fontWeight: "600" },
  // 화면 너비에 맞춰 자동 비율: 289/152
  mapWrap: { width: "100%", aspectRatio: ORIGINAL_WIDTH / ORIGINAL_HEIGHT },
});
