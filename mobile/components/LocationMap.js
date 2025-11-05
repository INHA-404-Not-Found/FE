import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import { G, Path, Svg, Image as SvgImage, Text } from "react-native-svg";

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

const AnimatedG = Animated.createAnimatedComponent(G);

const LocationMap = ({ selected, setSelected }) => {
  // 줌/팬 상태
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // 제스처 시작 시 기준값 저장 (누적 대신 덮어쓰기 기반)
  const startScale = useSharedValue(1);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  // 제스처 정의 (pinch + drag)
  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      // 확대 상태에서도 손가락 움직인 만큼 움직이게 보정
      translateX.value = startX.value + e.translationX * (scale.value + 1);
      translateY.value = startY.value + e.translationY * (scale.value + 1);
    });

  // 핀치 (focal 고정)
  const MIN = 1,
    MAX = 4;

  const pinch = Gesture.Pinch()
    .onStart((e) => {
      startScale.value = scale.value;
    })
    .onUpdate((e) => {
      // 새 스케일
      const next = Math.min(MAX, Math.max(MIN, startScale.value * e.scale));

      // focal(화면 좌표)을 기준으로 확대/축소 시, 그 지점이 화면상 고정되도록 보정
      const ds = next / scale.value; // 스케일 변화비
      const fx = e.focalX; // 화면 X
      const fy = e.focalY; // 화면 Y

      // 현재 translate 기준에서 focal을 고정하려면:
      translateX.value = fx - (fx - translateX.value) * ds;
      translateY.value = fy - (fy - translateY.value) * ds;

      scale.value = next;
    });

  const composed = Gesture.Simultaneous(pan, pinch);

  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const handlePress = (z) => {
    setSelected(z.id === selected.id ? null : z);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={composed}>
          <Svg
            viewBox={`0 0 ${ORIGINAL_WIDTH} ${ORIGINAL_HEIGHT}`}
            width="100%"
            style={{ aspectRatio: ORIGINAL_WIDTH / ORIGINAL_HEIGHT }}
            pointerEvents="box-none"
          >
            <AnimatedG
              animatedProps={animatedProps}
              originX={ORIGINAL_WIDTH / 2}
              originY={ORIGINAL_HEIGHT / 2}
            >
              <SvgImage
                href={MAP_IMAGE}
                x="0"
                y="0"
                width={ORIGINAL_WIDTH}
                height={ORIGINAL_HEIGHT}
                preserveAspectRatio="xMidYMid meet"
              />
              {CAMPUS_ZONES.map((z) => {
                const active = z.id === selected;
                return z.d ? (
                  <G key={z.id} onPress={() => handlePress(z)}>
                    <Path
                      d={z.d}
                      fill={
                        active ? "rgba(33,143,202,0.4)" : "rgba(33,143,202,0)"
                      }
                      stroke="#218FCA"
                      strokeWidth={active ? 3 : 1}
                    />
                    {z.label && (
                      <Text
                        x={z.label.x}
                        y={z.label.y}
                        fontSize={12}
                        fontWeight="bold"
                        fill="#0b3a56"
                      >
                        {z.name}
                      </Text>
                    )}
                  </G>
                ) : null;
              })}
            </AnimatedG>
          </Svg>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default LocationMap;

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
  container: { padding: 16, alignItems: "center" },
  title: { marginBottom: 12, fontSize: 16, fontWeight: "600" },
  // 화면 너비에 맞춰 자동 비율: 289/152
  mapWrap: { width: "100%", aspectRatio: ORIGINAL_WIDTH / ORIGINAL_HEIGHT },
});
