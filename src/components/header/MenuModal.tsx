import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '@env';

interface MenuModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({isVisible, onClose}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    async function init() {
      const has = await GoogleSignin.hasPlayServices();
      if (has) {
        GoogleSignin.configure({
          offlineAccess: true,
          webClientId: WEB_CLIENT_ID,
        });
      }
    }
    init();
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const data: any = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(
        data?.data.idToken,
      );

      console.log('credential: ', googleCredential);

      await auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log('e: ', e);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const onLogout = () => {
    signOut();
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => console.error('Error signing out:', error));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <TouchableOpacity onPress={onClose}>
              <Avatar.Image
                source={require('../../assets/images/close.png')}
                size={25}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.brandhead}>
              <Image
                source={require('../../assets/images/googlebrand.png')}
                style={[styles.brandlogo]}
              />
            </View>
          </View>

          {!!user ? (
            <TouchableOpacity style={[styles.item1, {marginBottom: 20}]}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <TouchableOpacity>
                  <Avatar.Image
                    source={require('../../assets/images/letterlogo.png')}
                    size={35}
                    style={styles.icon1}
                  />
                </TouchableOpacity>
                <View style={{marginVertical: 'auto'}}>
                  <Text style={styles.itemText}>Welcome,</Text>
                  <Text style={styles.itemText}>{user.email}</Text>
                  <TouchableOpacity style={styles.Logoutbtn} onPress={onLogout}>
                    <Text style={{color: '#fff'}}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.item1, {marginBottom: 20}]}
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <TouchableOpacity>
                  <Avatar.Image
                    source={require('../../assets/images/letterlogo.png')}
                    size={35}
                    style={styles.icon1}
                  />
                </TouchableOpacity>
                <View style={{marginVertical: 'auto'}}>
                  <Text style={styles.itemText}>Login your Google Account</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.item, {marginBottom: 10}]}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity>
                <Avatar.Image
                  source={require('../../assets/images/incognito.png')}
                  size={25}
                  style={styles.icon1}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.itemText}>Turn on Incognito</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {marginBottom: 10}]}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity>
                <Avatar.Image
                  source={require('../../assets/images/history.png')}
                  size={25}
                  style={styles.icon1}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.itemText}>Search history</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {marginBottom: 10}]}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity>
                <Avatar.Image
                  source={require('../../assets/images/shield.png')}
                  size={25}
                  style={styles.icon1}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.itemText}>SafeSearch</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {marginBottom: 10}]}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity>
                <Avatar.Image
                  source={require('../../assets/images/interest.png')}
                  size={25}
                  style={styles.icon1}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.itemText}>Interests</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {marginBottom: 10}]}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity>
                <Avatar.Image
                  source={require('../../assets/images/key.png')}
                  size={25}
                  style={styles.icon1}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.itemText}>Passwords</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {marginBottom: 10}]}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity>
                <Avatar.Image
                  source={require('../../assets/images/profile.png')}
                  size={25}
                  style={styles.icon1}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.itemText}>Your profile</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {marginBottom: 10}]}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity>
                <Avatar.Image
                  source={require('../../assets/images/star.png')}
                  size={25}
                  style={styles.icon1}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.itemText}>Search personalization</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {marginBottom: 10}]}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity>
                <Avatar.Image
                  source={require('../../assets/images/setting2.png')}
                  size={25}
                  style={styles.icon1}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.itemText}>Settings</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {marginBottom: 10}]}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity>
                <Avatar.Image
                  source={require('../../assets/images/help.png')}
                  size={25}
                  style={styles.icon1}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.itemText}>Help and feedback</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ffffff',
  },
  item: {
    paddingVertical: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  item1: {
    paddingVertical: 10,
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    color: '#e3e5e9',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  brandhead: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
    width: '90%',
  },
  brandlogo: {
    width: 100,
    height: 30,
    resizeMode: 'center',
  },
  icon: {
    backgroundColor: '#2a2a2a',
  },
  icon1: {
    backgroundColor: '#2a2a2a',
    marginRight: 10,
  },
  Logoutbtn: {
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 3,
    alignItems: 'center',
    borderColor: '#fff',
    width: '45%',
    padding: 10,
  },
});

export default MenuModal;
