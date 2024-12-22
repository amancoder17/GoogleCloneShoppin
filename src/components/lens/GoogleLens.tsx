import React, {useState, useEffect, useRef} from 'react';
import {API_KEY} from '@env';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  Alert,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {Avatar} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoMenu from './PhotoMenu';

const heightf = Dimensions.get('screen').height;

const GoogleLens = () => {
  const camera = useRef<Camera>(null);
  const subscriptionKey = API_KEY;
  const device = useCameraDevice('back');
  const [cameraPermission, setCameraPermission] = useState(false);
  const [finalImageUri, setFinalImageUri] = useState<string>();

  const animatedValue = useRef(new Animated.Value(heightf - 100)).current;
  const expandedHeight = heightf / 3;
  const collapsedHeight = heightf - 100;

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setCameraPermission(status === 'granted');
    };
    requestPermission();
  }, []);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          const newHeight = expandedHeight + gestureState.dy;
          if (newHeight <= collapsedHeight) {
            animatedValue.setValue(newHeight);
          }
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 50) {
          collapseMenu();
        } else {
          expandToMidScreen();
        }
      },
    }),
  ).current;

  const expandToMidScreen = () => {
    Animated.timing(animatedValue, {
      toValue: expandedHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const collapseMenu = () => {
    Animated.timing(animatedValue, {
      toValue: collapsedHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleMenuClick = async () => {
    setTimeout(() => {
      expandToMidScreen();
    }, 500);

    if (camera.current) {
      try {
        // Capture photo
        const photo = await camera.current.takePhoto({
          enableShutterSound: true,
        });
        const currentImageUri = 'file://' + photo.path;
        console.log('Photo taken:', photo);
        console.log('Opening Cropper...');

        ImagePicker.openCropper({
          path: currentImageUri,
          width: 3072,
          height: 4095,
          mediaType: 'photo',
        })
          .then(croppedImage => {
            console.log('Cropped image:', croppedImage);
            setFinalImageUri(croppedImage.path);
          })
          .catch(error => {
            console.error('Error cropping image:', error);
          });
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };
  const handleGalleryClick = async () => {
    try {
      ImagePicker.openPicker({
        width: 3072,
        height: 4095,
        cropping: true,
        mediaType: 'photo',
      })
        .then(croppedImage => {
          console.log('Cropped image:', croppedImage);
          setFinalImageUri(croppedImage.path);
        })
        .catch(error => {
          console.error('Error cropping image:', error);
        });
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  if (!cameraPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
      </View>
    );
  }

  if (!device) return <Text>Loading Camera...</Text>;

  return (
    <View style={styles.container}>
      {finalImageUri ? (
        <View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFinalImageUri(undefined)}>
              <Avatar.Image
                source={require('../../assets/images/back.png')}
                size={25}
                style={{backgroundColor: '#000000'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                position: 'absolute',
                top: 65,
                left: '35%',
                fontSize: 25,
              }}>
              <Text style={{fontWeight: 'bold'}}>Google</Text> Lens
            </Text>
          </View>
          <Image source={{uri: finalImageUri}} style={styles.capturedImage} />
        </View>
      ) : (
        <>
          <Camera
            style={{height: heightf - 100}}
            device={device}
            isActive={true}
            ref={camera}
            photo={true}
          />
          <View style={styles.overlay}>
            <View style={styles.topOverlay} />
            <Text
              style={{
                color: '#fff',
                position: 'absolute',
                top: 65,
                left: '35%',
                fontSize: 25,
              }}>
            <Text style={{fontWeight: 'bold'}}>Google</Text>Lens</Text>
            <View style={styles.middleOverlay}>
              <View style={styles.sideOverlay} />
              <View style={styles.sideOverlay} />
            </View>
            <View style={styles.bottomOverlay}>
              <View>
                <TouchableOpacity
                  style={styles.galleryButton}
                  onPress={handleGalleryClick}>
                  <Avatar.Image
                    source={require('../../assets/images/galley.png')}
                    size={35}
                    style={{backgroundColor: 'transparent'}}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.captureButtonContainer]}>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleMenuClick}>
                  <Avatar.Image
                    source={require('../../assets/images/lensSearch.png')}
                    size={35}
                    style={{backgroundColor: '#eceae8'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}

      <Animated.View
        style={[
          styles.bottomMenu,
          {
            transform: [{translateY: animatedValue}],
          },
        ]}
        {...panResponder.panHandlers}>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log('Translate pressed!')}>
            <Avatar.Image source={require('../../assets/images/ltrans.png')} size={18} style={{marginVertical:'auto',backgroundColor:'transparent',marginRight:5}}/>
          <Text style={styles.menuText}>Translate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem,{backgroundColor:"#384558"}]}
          onPress={() => console.log('Search pressed!')}>
            <Avatar.Image source={require('../../assets/images/lsearch.png')} size={18} style={{marginVertical:'auto',backgroundColor:'#384558',marginRight:5}}/>
          <Text style={[styles.menuText, {fontWeight:'bold',color:"#93b7f1"}]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log('Homework pressed!')}>
            <Avatar.Image source={require('../../assets/images/ledu.png')} size={18} style={{marginVertical:'auto',backgroundColor:'transparent',marginRight:5}}/>
          <Text style={styles.menuText}>Homework</Text>
        </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
            {
                finalImageUri?<PhotoMenu/>:<></>
            }
        
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {color: 'red', fontSize: 16},
  overlay: {...StyleSheet.absoluteFillObject},
  topOverlay: {flex: 1},
  middleOverlay: {flexDirection: 'row', height: 200},
  sideOverlay: {flex: 1},
  focusBox: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  bottomOverlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 150,
  },
  captureButtonContainer: {
    width: 100,
    position: 'absolute',
    transform: [{translateX: -50}, {translateY: -50}],
    height: 100,
    borderRadius: 50,
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#eceae8',
  },
  captureButton: {
    width: 80,
    height: 80,
    backgroundColor: '#eceae8',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    width: 80,
    height: 80,
    // backgroundColor: '#eceae8',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 1,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1f2125',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: heightf,
  },
  menuItem: {
    paddingHorizontal: 15,
    flexDirection:'row',
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    height: 35,
    marginVertical: 5,
    
  },
  activeMenuItem: {
    backgroundColor: '#ffffff',
  },
  menuText: {
    color: '#ffffff',
    fontSize: 16,
  },
  activeMenuText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  capturedImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10,
  },
  capturedImage: {
    width: '100%',
    height: heightf - 100,
    resizeMode: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    padding: 20,
    borderRadius: 20,
    zIndex: 20,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default GoogleLens;
