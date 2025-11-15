<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

use function Laravel\Prompts\password;

class UserController extends Controller
{
    public function index(){
        $users = User::orderByDesc('id')->paginate(10);
        if($users->isEmpty()){
            return response()->json(['message' => 'You dont have users in your database.'], 404);
        }

        usleep(500000);
        return UserResource::collection($users);
    }


    public function store(CreateUserRequest $request){
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated["name"],
            'email' => $validated["email"],
            'password' => bcrypt($validated["password"]),
        ]);

        return response(new UserResource($user),200);
    }

    public function show(User $user){
        return response(new UserResource($user));
    }

    public function update(UpdateUserRequest $request, User $user){
        $validated = $request->validated();

        if(isset($validated['password']))$validated['password'] = bcrypt($validated['password']); 
        $user->update($validated);

        return response(new UserResource($user));
    }


    public function destroy(User $user){
        $user->delete();
        return response("",200);       
    }    

}
