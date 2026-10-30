import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OutletListScreen from '../features/outlets/screens/OutletListScreen';
import CreateOutletScreen from '../features/outlets/screens/CreateOutletScreen';
import OutletDetailsScreen from '../features/outlets/screens/OutletDetailsScreen';
import EditOutletScreen from '../features/outlets/screens/EditOutletScreen';

export type RootStackParamList = {
  OutletList: undefined;
  CreateOutlet: undefined;
  OutletDetails: { id: string };
  EditOutlet: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="OutletList" component={OutletListScreen} options={{ title: 'Outlet Manager' }} />
        <Stack.Screen name="CreateOutlet" component={CreateOutletScreen} options={{ title: 'Create Outlet' }} />
        <Stack.Screen name="OutletDetails" component={OutletDetailsScreen} options={{ title: 'Outlet Details' }} />
        <Stack.Screen name="EditOutlet" component={EditOutletScreen} options={{ title: 'Edit Outlet' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
