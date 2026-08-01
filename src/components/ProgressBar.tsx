import { StyleSheet, View } from 'react-native';

interface Props {
    done: number;
    total: number;
}

export default function ProgressBar({ done, total }: Props) {
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    const color = pct === 100 ? '#2e9e5b' : pct >= 50 ? '#2f6fed' : '#d99a2b';

  return (
        <View style={styles.track}>
                <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]}/>
        </View>
      );
}

const styles = StyleSheet.create({
    track: {
          height: 6,
          borderRadius: 3,
          backgroundColor: '#e6e9ef',
          overflow: 'hidden',
          width: '100%',
    },
    fill: {
          height: '100%',
          borderRadius: 3,
    },
});
