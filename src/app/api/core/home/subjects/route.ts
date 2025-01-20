// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Models
import { SubjectClass } from '@/models/subject';
import { GetSubjectByCreatorId, GetSubjectById } from '@/database/pool';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const subjects = await GetSubjectByCreatorId(userId as string);
    if (!subjects) {
      return NextResponse.json('Subjects not found', { status: 404 });
    }
    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to get subjects', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Extract and verify the JWT
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const { subjectName, details, image } = await req.json();
    const creator = token.uid;

    if (!subjectName || !creator) {
      return NextResponse.json('Missing required fields', { status: 400 });
    }

    const id = await SubjectClass.Insert(
      subjectName,
      details ? details : '',
      creator.toString(),
      image
    );

    if (id === null) {
      console.error("Creating Subject in database did not return id")
      return NextResponse.json({ status: 500 });
    }

    const subject = await GetSubjectById(id)
    // Luka: +
    // I need to get subjectId (and subjectName, details, image) as a response, in order to create it on client (instead of refreshing the page)
    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to create subject', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Extract and verify the JWT
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json('Missing required fields', { status: 400 });
    }

    await SubjectClass.Delete(id);
    return NextResponse.json('Subject deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to delete subject', { status: 500 });
  }
}

// Luka: +
//  This needs to be PATCH, because user doesn't update all the fileds (give them possiblity to update one field, two filed etc.)
export async function PATCH(req: NextRequest) {
  try {
    // Extract and verify the JWT
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const { subjectId, subjectName, details } = await req.json();

    if (!subjectId) {
      return NextResponse.json( { status: 400, statusText: "Missing subject Id" });
    }

    const updates: { [key: string]: any } = {};
    if (subjectName) updates.name = subjectName;
    if (details) updates.details = details;
    //Add picture

    if (Object.keys(updates).length === 0) {
      return NextResponse.json('No fields to update', { status: 400 });
    }

    await SubjectClass.Update(subjectId, updates);
    return NextResponse.json('Subject updated successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to update subject', { status: 500 });
  }
}
