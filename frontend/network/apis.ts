import axios, { AxiosError } from "axios";
import { AddFriendDto } from "./dto/payload/add-friend.dto";
import { ProfilesUser } from "./dto/payload/profileuser";
import { SigninDto } from "./dto/payload/signin.dto";
import { SignupDto } from "./dto/payload/signup.dto";
import { ErrorResponse } from "./dto/response/error-response.dto";
import { FriendsResponse } from "./dto/response/friends-response.dto";
import { ProfileResponse } from "./dto/response/profile-response.dto";
import { RelationResponse } from "./dto/response/relation-response.dto";
import { SigninResponse } from "./dto/response/signin-response.dto";
import { localService } from "./local.service";

export namespace Apis {
  /*
    login user
  */
  export async function Signin(options: {
    signDto: SigninDto;
    onSuccess: (data: SigninResponse) => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      const res = await localService.post<SigninResponse>("api/auth/signin", options.signDto);
      localStorage.setItem("access_token", res.data.access_token);
      return options.onSuccess(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  /*
    register user
  */
  export async function SignUp(options: {
    signupDto: SignupDto;
    onSuccess: () => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      const res = await localService.post("api/auth/signup", options.signupDto);
      return options.onSuccess();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  
  /*
    get other user profile
  */
  export async function ProfilesUser(options:{
    username: ProfilesUser;
    onSuccess: (profile: ProfileResponse) => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try{
      const res = await localService.get<ProfileResponse>(`api/profiles/username/${options.username.username}`);
      return options.onSuccess(res.data);
    }catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
    
  }

  /*
    get current user profile
  */
  export async function CurrentProfile(options: {
    onSuccess: (profile: ProfileResponse) => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      const res = await localService.get<ProfileResponse>("api/profiles");
      return options.onSuccess(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  /*
    authenticate with 42 intra
  */
  export async function autherizeFortytwo() {
    const authenticationUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/intra";
    window.location.assign(authenticationUrl);
  }

  export async function Logout(options: {
    onSuccess: () => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      await localService.get("/api/auth/logout");
      return options.onSuccess();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  /*
    verify current user credentials
  */
  export async function Verify(options: {
    onSuccess: () => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      await localService.get("/api/auth/verify");
      return options.onSuccess();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  /*
    send friend request or accept friend request
  */
  export async function AddFriend(options: {
    addFriendDto: AddFriendDto,
    onSuccess: () => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      await localService.post("/api/users/relations/friend", options.addFriendDto);
      return options.onSuccess();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  /*
    remove friend
  */
  export async function RemoveFriend(options: {
    addFriendDto: AddFriendDto,
    onSuccess: () => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      await localService.post("/api/users/relations/unfriend", options.addFriendDto);
      return options.onSuccess();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  /*
    returns friends list with relations
  */
  export async function getFriends(options: {
    onSuccess: (friends: FriendsResponse[]) => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      const res = await localService.get<FriendsResponse[]>("/api/users/relations/friends");
      return options.onSuccess(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  /*
    returns relation between current user and other user
  */
  export async function getRelation(options: {
    username: string;
    onSuccess: (relation: RelationResponse) => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      const res = await localService.get<RelationResponse>(`/api/users/relations/username/${options.username}`);
      return options.onSuccess(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  /*
    block user (block feature have no effect for now)
  */
  export async function Block(options: {
    username: string,
    onSuccess: () => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      await localService.get(`/api/users/relations/block/${options.username}`);
      return options.onSuccess();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }

  /*
    unblock user (unblock feature have no effect for now)
  */
  export async function Unblock(options: {
    username: string,
    onSuccess: () => void,
    onFailure: (err: ErrorResponse) => void;
  }) {
    try {
      await localService.get(`/api/users/relations/unblock/${options.username}`);
      return options.onSuccess();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        if (error && error.response && error.response.data) {
          return options.onFailure(error.response.data);
        }
      }
    }
    return options.onFailure({ message: "something went wrong!" });
  }
}
